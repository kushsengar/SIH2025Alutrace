# Section 2: AI/ML Implementation
AI layer specification for the AI-Driven LCA Tool in metallurgy and mining. This document details models, parameters, inputs/outputs, orchestration, uncertainty, and RAG integration to achieve accurate, explainable, and performant results.

References:
- [RAG_Implementation_Guide.md](RAG_Implementation_Guide.md) (retrieval stack, decision support)
- [Data_Acquisition_Guide.md](Data_Acquisition_Guide.md) (sources, pipelines, synthetic data)
- [README.md](README.md) (overall solution context)

Table of Contents
- 2.1 Scope and Assumptions
- 2.2 Parameter and Feature Specification
- 2.3 Model Inventory and Count
- 2.4 Inputs/Outputs per Model (with JSON examples)
- 2.5 Orchestration and Data Flow
- 2.6 Training, Validation, and Evaluation
- 2.7 Uncertainty, Governance, and RAG Fallback
- 2.8 Continuous Learning and MLOps
- 2.9 Security, Performance, Maintainability
- 2.10 Pseudocode for Key Routines
- 2.11 Acceptance Criteria (Initial)
- 2.12 Implementation Checklist

## 2.1 Scope and Assumptions
- Metals in scope (initial): Aluminium (primary and secondary); copper-ready design
- AI objectives:
  - Predict/complete missing Life Cycle Inventory (LCI) parameters reliably
  - Select/regress emission factors contextually (process, region, technology, year)
  - Provide fast what-if analysis via process surrogate models
  - Quantify uncertainty; trigger retrieval-augmented explanations and factors when needed
  - Optimize scenarios for circularity and footprint reduction
- Tooling assumptions:
  - Python stack: scikit-learn, XGBoost/LightGBM, PyTorch, MLflow
  - Feature store: Parquet/Delta; versioned datasets
  - Registry: MLflow model registry with signatures and input examples
  - RAG: ChromaDB (dev) or Qdrant (prod option); Mistral-7B locally; vendor LLM optional
- Non-functional targets:
  - Interactive what-if inference p95 ≤ 700 ms (cached/surrogates); ≤ 2.5 s cold
  - Calibrated 90% prediction intervals within ±5% coverage error
  - Explainability: provenance for factors and cited text for guidance


## 2.2 Parameter and Feature Specification
All inputs are validated for range, type, and logical consistency. Units are SI. See the complementary data sourcing and ingestion details in [Data_Acquisition_Guide.md](Data_Acquisition_Guide.md).

Core scenario parameters (selected):
- metal_type: enum {"aluminium", "copper"}
- process_stage: enum {"mining", "refining", "smelting", "fabrication", "recycling"}
- technology: enum {"Bayer", "Hall-Héroult", "Remelt", "SX-EW", "BlastFurnace", "EAF"}
- region_iso: string (ISO-2/3)
- year: int (YYYY)
- production_tonnes: float ≥ 0 (t)
- recycled_content_pct: float [0,100]
- eol_recycling_rate_pct: float [0,100]
- scrap_quality_index: float [0,1]
- electricity_kwh_per_t: float ≥ 0
- fuel_ng_gj_per_t: float ≥ 0
- fuel_coal_gj_per_t: float ≥ 0
- grid_renewable_pct: float [0,100]
- ore_grade_pct: float [0,100] (0 for pure recycling)
- recovery_rate_pct: float [0,100]
- transport_km: float ≥ 0
- transport_mode: enum {"road","rail","ship"}
- technology_age_years: float [0,60]
- calcination_temp_c: float [0,1500] (if refining)
- anode_type: enum {"prebaked","soderberg"} (if smelting)
- water_intake_m3_per_t: float ≥ 0
- waste_ratio: float [0,1]

Derived features (examples):
- energy_intensity_gj_per_t = electricity_kwh_per_t × 0.0036 + fuel_ng_gj_per_t + fuel_coal_gj_per_t
- emission_intensity_kgco2_per_kg = total_co2_kg / (production_tonnes × 1000)
- circular_score = f(recycled_content_pct, eol_recycling_rate_pct, scrap_quality_index)
- simplified_MCI ≈ α·recycled_content + β·EoL_rate − γ·material_loss (defaults α=0.5, β=0.4, γ=0.3; tune with SMEs)

Validation rules (selected):
- Range/type checks on all fields
- If process_stage == "smelting" and anode_type=="soderberg" → allow higher SOx bounds
- Mass-energy balance sanity: inputs ≥ outputs within ε (e.g., 2–8%)
- If recycled_content_pct > 0 and ore_grade_pct > 0 → ensure consistent route metadata

JSON schema (ScenarioInput):
```json path=null start=null
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ScenarioInput",
  "type": "object",
  "required": ["metal_type", "process_stage", "region_iso", "year", "production_tonnes"],
  "properties": {
    "metal_type": {"type": "string", "enum": ["aluminium", "copper"]},
    "process_stage": {"type": "string", "enum": ["mining","refining","smelting","fabrication","recycling"]},
    "technology": {"type": "string"},
    "region_iso": {"type": "string"},
    "year": {"type": "integer", "minimum": 1990, "maximum": 2100},
    "production_tonnes": {"type": "number", "minimum": 0},
    "recycled_content_pct": {"type": "number", "minimum": 0, "maximum": 100},
    "eol_recycling_rate_pct": {"type": "number", "minimum": 0, "maximum": 100},
    "scrap_quality_index": {"type": "number", "minimum": 0, "maximum": 1},
    "electricity_kwh_per_t": {"type": "number", "minimum": 0},
    "fuel_ng_gj_per_t": {"type": "number", "minimum": 0},
    "fuel_coal_gj_per_t": {"type": "number", "minimum": 0},
    "grid_renewable_pct": {"type": "number", "minimum": 0, "maximum": 100},
    "ore_grade_pct": {"type": "number", "minimum": 0, "maximum": 100},
    "recovery_rate_pct": {"type": "number", "minimum": 0, "maximum": 100},
    "transport_km": {"type": "number", "minimum": 0},
    "transport_mode": {"type": "string", "enum": ["road","rail","ship"]},
    "technology_age_years": {"type": "number", "minimum": 0, "maximum": 60},
    "calcination_temp_c": {"type": "number", "minimum": 0, "maximum": 1500},
    "anode_type": {"type": "string", "enum": ["prebaked","soderberg"]},
    "water_intake_m3_per_t": {"type": "number", "minimum": 0},
    "waste_ratio": {"type": "number", "minimum": 0, "maximum": 1}
  }
}
```


## 2.3 Model Inventory and Count
Initial production-ready set: 13 models.

1) LCI Gap-Filling Ensemble (multi-output)
- Purpose: Predict missing LCI parameters (energy, CO2, water, waste, transport emissions)
- Algorithms: XGBoost/LightGBM, RandomForest, ElasticNet, small MLP; stacked/blended
- Targets: [energy_use_gj_per_t, co2_kg_per_kg, water_use_m3_per_t, waste_kg_per_t, transport_emissions_kg]

2) Emission Factor (EF) Selector & Mapper
- Purpose: Rank/select EF values conditioned on process/region/tech/year; regress missing EF
- Algorithms: Learning-to-rank GBDT (LightGBM Ranker) + regressor fallback

3–5) Process Surrogate Models (3)
- Units: alumina refining, Hall-Héroult smelting, recycling remelt
- Purpose: Fast what-if for sub-stage impacts with gradient-like sensitivities
- Algorithms: GBDT or small MLP regressors

6) Circularity Metrics Estimator
- Purpose: Compute recycled content, EoL rate, MCI/CI; impute partial inputs
- Algorithms: Deterministic formulas + simple regressors for unknowns

7–11) Time-series Forecasters (5 regions)
- Purpose: Forecast regional grid carbon intensity and electricity mix
- Algorithms: XGBoost/Prophet/LSTM (choose per region performance)

12) Anomaly & Consistency Checker
- Purpose: Detect data errors/violations; trigger human/RAG
- Algorithms: Isolation Forest or One-Class SVM + rule checks

13) Recommendation & Optimization Engine
- Purpose: Suggest scenario changes (scrap %, grid mix, process params) to minimize footprint/maximize circularity
- Algorithms: Bayesian optimization (GP/TPE) or genetic algorithm using surrogates as objective functions

Uncertainty Quantification Layer (shared)
- Methods: Ensemble variance, quantile regression (q10/50/90), MC-dropout (MLP), conformal prediction for calibrated intervals


## 2.4 Inputs/Outputs per Model (with JSON examples)
Example keys assume ScenarioInput schema; units noted in meta.

A) Gap-Filling Ensemble
Inputs: normalized feature vector from ScenarioInput
Outputs: mean predictions + P10/P90 intervals for each target

Request:
```json path=null start=null
{
  "scenario": {
    "metal_type": "aluminium",
    "process_stage": "smelting",
    "region_iso": "IN",
    "year": 2025,
    "production_tonnes": 120000,
    "recycled_content_pct": 35,
    "electricity_kwh_per_t": 14200,
    "fuel_ng_gj_per_t": 0,
    "fuel_coal_gj_per_t": 2.5,
    "grid_renewable_pct": 28,
    "anode_type": "prebaked"
  }
}
```
Response:
```json path=null start=null
{
  "imputed": {
    "energy_use_gj_per_t": {"mean": 155.2, "p10": 146.0, "p90": 165.1},
    "co2_kg_per_kg": {"mean": 11.9, "p10": 10.8, "p90": 13.1},
    "water_use_m3_per_t": {"mean": 95.0, "p10": 80.0, "p90": 110.0},
    "waste_kg_per_t": {"mean": 430.0, "p10": 380.0, "p90": 480.0},
    "transport_emissions_kg": {"mean": 85.0, "p10": 60.0, "p90": 110.0}
  },
  "confidence": 0.82
}
```

B) EF Selector & Mapper
Inputs: process meta + candidates from EF catalog (from RAG or database)
Outputs: chosen factor with provenance and confidence

Request:
```json path=null start=null
{
  "meta": {
    "metal_type": "aluminium",
    "process_stage": "smelting",
    "region_iso": "IN",
    "year": 2025,
    "anode_type": "prebaked"
  },
  "candidates": [
    {"factor_id": "EF_IN_2024_GRID_CO2", "value": 0.82, "unit": "kgCO2/kWh", "source": "CEA"},
    {"factor_id": "EF_IN_2025_GRID_CO2_EST", "value": 0.78, "unit": "kgCO2/kWh", "source": "Forecast"}
  ]
}
```
Response:
```json path=null start=null
{
  "selected": {
    "factor_id": "EF_IN_2025_GRID_CO2_EST",
    "value": 0.78,
    "unit": "kgCO2/kWh",
    "source": "Forecast",
    "confidence": 0.74
  },
  "alternatives": ["EF_IN_2024_GRID_CO2"]
}
```

C) Process Surrogates (example: smelting)
Request:
```json path=null start=null
{
  "inputs": {
    "electricity_kwh_per_t": 14200,
    "grid_renewable_pct": 28,
    "recycled_content_pct": 35,
    "anode_type": "prebaked"
  }
}
```
Response:
```json path=null start=null
{
  "impacts": {
    "co2_kg_per_kg": {"mean": 11.8, "p10": 10.9, "p90": 12.7},
    "energy_use_gj_per_t": {"mean": 153.5, "p10": 147.0, "p90": 160.2}
  },
  "sensitivities": {
    "dCO2_d_electricity_kwh_per_t": 0.0007,
    "dCO2_d_grid_renewable_pct": -0.03
  }
}
```

D) Circularity Metrics Estimator
Request:
```json path=null start=null
{
  "circular_inputs": {
    "recycled_content_pct": 35,
    "eol_recycling_rate_pct": 70,
    "scrap_quality_index": 0.8,
    "waste_ratio": 0.12
  }
}
```
Response:
```json path=null start=null
{
  "circularity": {
    "recycled_content_pct": 35,
    "eol_recycling_rate_pct": 70,
    "mci": {"mean": 0.58, "p10": 0.52, "p90": 0.63}
  }
}
```

E) Forecaster (region IN)
Request:
```json path=null start=null
{
  "region": "IN",
  "horizon_days": 30
}
```
Response:
```json path=null start=null
{
  "grid_co2_g_per_kwh": {
    "point_forecast": [620, 615, 612, 610, ...],
    "pi90": [[560, 690], [555, 685], [550, 680], [548, 675], ...]
  },
  "renewable_share_pct": {
    "point_forecast": [23.5, 24.0, 24.2, ...],
    "pi90": [[18.0, 30.0], ...]
  }
}
```

F) Anomaly & Consistency Checker
Response example:
```json path=null start=null
{
  "anomaly_score": 0.78,
  "violations": [
    {"rule": "mass_balance", "detail": "Inputs < outputs by 6.5%"},
    {"rule": "range_check", "field": "electricity_kwh_per_t", "detail": "Value 25000 exceeds P99 bound 22000"}
  ]
}
```

G) Optimization/Recommender
Request:
```json path=null start=null
{
  "objective": "minimize_co2",
  "bounds": {
    "recycled_content_pct": [0, 90],
    "grid_renewable_pct": [10, 60]
  },
  "constraints": [
    {"type": "ineq", "expr": "energy_use_gj_per_t <= 160"},
    {"type": "ineq", "expr": "mci >= 0.6"}
  ],
  "budget": {"capex_usd": 500000}
}
```
Response:
```json path=null start=null
{
  "top_scenarios": [
    {
      "decision": {"recycled_content_pct": 65, "grid_renewable_pct": 45},
      "impacts": {"co2_kg_per_kg": 8.9, "energy_use_gj_per_t": 145, "mci": 0.64},
      "tradeoffs": {"cost_delta_usd_per_t": 22}
    }
  ],
  "convergence": {"iterations": 40, "best_score": 8.9}
}
```


## 2.5 Orchestration and Data Flow
Pipeline (synchronous inference path):
1) Ingest & Validate → 2) Gap-Fill → 3) EF Select/Map → 4) Surrogate Impacts → 5) Circularity → 6) Forecast overlay (grid) → 7) Optimization (optional) → 8) Reporting with uncertainty

- Caching: LRU memory + Redis optional, key = SHA256(scenario payload). TTL aligns with EF/forecast updates.
- Error handling: Structured error JSON; correlation_id; no raw errors surfaced to UI.
- Model registry: MLflow models with signatures and example inputs.

Orchestrator pseudocode:
```python path=null start=null
def run_analysis(scenario):
  scenario = validate_schema(scenario)
  if cache.has(scenario):
    return cache.get(scenario)

  gaps = gap_filler.predict_with_intervals(scenario)
  scenario = fill_missing(scenario, gaps)

  ef_candidates = retrieve_ef_candidates(scenario)  # DB/RAG
  ef = ef_selector.rank_and_select(scenario, ef_candidates)

  impacts = {}
  for unit in unit_processes_for(scenario):
    impacts[unit] = surrogate[unit].predict_with_intervals(scenario, ef)

  circular = circularity_estimator.compute(scenario)
  forecast = forecaster.predict(region=scenario.region_iso)
  impacts = overlay_forecast(impacts, forecast)

  uq = aggregate_uncertainty(gaps, ef, impacts, circular)
  if should_invoke_rag(uq, scenario):
    rag = rag_assistant.enrich(scenario, ef, impacts)
  else:
    rag = None

  result = compose_report(scenario, impacts, circular, ef, uq, rag)
  cache.set(scenario, result)
  return result
```

Triggering RAG policy (see 2.7):
- If any: PI width/mean > 30% OR anomaly_score ≥ 0.7 OR violations non-empty → call RAG for enrichment/citations.


## 2.6 Training, Validation, and Evaluation
- Data splits: 70/15/15 train/val/test; group by plant/site to avoid leakage. Time-aware for forecasters.
- Cross-validation: K=5 for tabular; rolling-window for time-series.
- Metrics:
  - Regression: MAE, RMSE, R²; report MAPE
  - Ranking (EF): NDCG@5, MRR
  - Anomaly: AUROC, AUPRC; violation precision/recall
  - Uncertainty: calibration error (ECE), PI coverage at 90% target ±5%
- Baselines: mean/median; rules-only EF mapping; physics heuristics
- Acceptance thresholds (initial):
  - Gap-Filler: RMSE ≤ 10% of target range; PI90 coverage 85–95%
  - EF Selector: NDCG@5 ≥ 0.85
  - Surrogates: RMSE within 5–10% of reference/physics
  - Forecasters: sMAPE ≤ 12% (region-dependent)
  - Anomaly: AUROC ≥ 0.90; ≥ 0.8 precision on violations
- Reproducibility: fixed seeds, MLflow runs, data versioning, environment lockfile


## 2.7 Uncertainty, Governance, and RAG Fallback
Uncertainty computation:
- Ensembles (variance), quantile regression for P10/P50/P90, MC-dropout (MLP), conformal prediction for calibrated bounds.
Surfacing:
- Attach mean + P10/P50/P90 to every numeric output; include coverage diagnostics in logs.
Decision thresholds:
- If (PI width/mean > 0.30) OR (anomaly_score ≥ 0.7) OR (violated_constraints not empty) → invoke RAG assistant.
Governance:
- Model cards, audit logs (inputs, hashes, model/version IDs), provenance for EFs, citation logs for RAG.

RAG integration overview (see [RAG_Implementation_Guide.md](RAG_Implementation_Guide.md)):
- Retrieval: hybrid (dense + BM25) over standards, literature, regulations, plant manuals; vector DB ChromaDB/Qdrant.
- Generation: Mistral-7B (local) by default; vendor LLM optional. No secrets in code; use env vars.
- Contracts:
```json path=null start=null
{
  "rag_query": {
    "prompt": "Emission factor for IN grid 2025 for aluminium smelting context",
    "meta": {"region":"IN","year":2025,"process":"smelting","metal":"aluminium"}
  },
  "rag_response": {
    "answer": "CEA 2024 published 0.82 kgCO2/kWh; 2025 est 0.78 based on ...",
    "sources": [{"title":"CEA Report 2024","url":"https://..."}],
    "confidence": 0.78,
    "factors": [{"id":"EF_IN_2025_GRID_CO2_EST","value":0.78,"unit":"kgCO2/kWh"}],
    "citations": [1,2]
  }
}
```


## 2.8 Continuous Learning and MLOps
- Feedback capture: user edits to imputed values and chosen EFs persisted with provenance → training data.
- Retraining cadence: weekly scheduled; on-demand hot-fix for drift.
- Deployment: champion/challenger with canary; rollback on SLO breach.
- Monitoring: PSI for drift, feature/target stability, latency SLOs, error budgets.
- Versioning: MLflow models with stage tags; DVC/LakeFS for data snapshots.


## 2.9 Security, Performance, Maintainability
Security
- No secrets in code; environment variables (.env.example) and Vault/KeyVault in prod
- HTTPS-only for APIs; JWT with rotation and refresh; strict input validation; interceptors/logging; rate limiting
- Never expose raw errors; standardized error schema; correlation IDs; audit trails

Performance
- CPU-first for GBDTs; optional GPU for MLP/LSTM; quantization for MLP
- Batch inference for bulk; warm models; memoize common what-if paths
- Cache EF lookups and surrogate results by scenario hash; TTL tied to data staleness

Maintainability
- Clean Architecture separation (Domain/Application/Infrastructure/Presentation)
- Modular services with clear DTOs and JSON schemas; tests (unit/integration) and CI gate; conventional commits
- Documented parameter defaults and ranges; model cards and changelog updates


## 2.10 Pseudocode for Key Routines
Gap-filling with intervals:
```python path=null start=null
import numpy as np

def infer_with_gap_filling(features, ensemble):
  preds = np.stack([m.predict(features) for m in ensemble], axis=0)  # [M, K]
  mean = preds.mean(axis=0)
  p10, p90 = np.quantile(preds, [0.1, 0.9], axis=0)
  return {"mean": mean.tolist(), "p10": p10.tolist(), "p90": p90.tolist()}
```

EF ranking and mapping:
```python path=null start=null
def select_emission_factor(meta, candidates, ranker, regressor=None):
  scores = ranker.predict(candidates)  # learning-to-rank features engineered from meta + candidate meta
  best_idx = int(np.argmax(scores))
  best = candidates[best_idx]
  if missing_value(best):
    best.value = regressor.predict({**meta, **best}) if regressor else None
  return {
    "factor_id": best.factor_id,
    "value": best.value,
    "unit": best.unit,
    "provenance": best.source,
    "confidence": float(softmax(scores)[best_idx])
  }
```

Uncertainty gating with RAG fallback:
```python path=null start=null
def should_invoke_rag(uq, anomaly_score, violations):
  wide = any((hi - lo) / max(abs(mu), 1e-6) > 0.30 for mu, lo, hi in uq)
  return wide or (anomaly_score is not None and anomaly_score >= 0.7) or (violations and len(violations) > 0)
```

Optimization loop (Bayesian opt over surrogates):
```python path=null start=null
def optimize_scenario(bounds, constraints, surrogate, objective, n_iter=40):
  from bayes_opt import BayesianOptimization
  def f(**params):
    impacts = surrogate.predict(params)
    if not satisfies(impacts, constraints):
      return -1e9  # penalize infeasible
    return -impacts[objective]  # minimize
  bo = BayesianOptimization(f=f, pbounds=bounds, random_state=42)
  bo.maximize(init_points=8, n_iter=n_iter)
  return bo.max
```


## 2.11 Acceptance Criteria (Initial)
- Documented I/O schemas and JSON examples per model
- Calibrated uncertainty intervals with 90% coverage ±5%
- EF selector achieves NDCG@5 ≥ 0.85 on validation
- Surrogates RMSE within 5–10% of physics or reference
- Forecasters sMAPE ≤ 12% regionally
- Anomaly detector AUROC ≥ 0.90 with high precision on rule violations
- RAG invoked under defined thresholds; responses include sources and confidence

Reviewer checklist
- I/O JSON matches schema (fields, units, ranges) and examples parse
- Parameter catalog present with defaults and tuning ranges for all models
- Uncertainty policy and RAG thresholds are explicit and testable
- Security/performance/maintainability requirements align with project rules
- Metrics and acceptance thresholds are filled for each model and are measurable
- Cross-links to RAG_Implementation_Guide.md and Data_Acquisition_Guide.md are working


## 2.12 Implementation Checklist
- [ ] Wire feature store schemas and validation
- [ ] Train and register gap-filling ensemble (with quantiles)
- [ ] Implement EF ranker + candidate generation (DB + RAG fallback)
- [ ] Build three surrogates; attach sensitivities via finite diffs/SHAP
- [ ] Implement circularity calculator and imputation
- [ ] Train 5 regional forecasters; expose API
- [ ] Anomaly + rule checks; integrate into orchestrator
- [ ] BO/GA optimizer using surrogates
- [ ] Uncertainty gating; invoke RAG_Implementation_Guide.md flow
- [ ] End-to-end tests with example scenarios

Consistency & validation checklist
- Units and ranges are consistent across schema, examples, and model I/O
- Feature names are identical throughout docs and payloads
- JSON examples validate against the provided JSON Schema
- Orchestrator pseudocode references existing keys and sections

Dry-run walkthrough (example)
1) Input: aluminium, smelting, IN, 2025, 120k t; recycled_content_pct=35; electricity_kwh_per_t=14200; grid_renewable_pct=28; anode=prebaked
2) Gap-fill returns energy=155.2 GJ/t (P10/P90 146/165), CO2=11.9 kg/kg (10.8/13.1)
3) EF selector chooses grid EF 0.78 kgCO2/kWh (confidence 0.74; alt 0.82)
4) Surrogate predicts impacts; overlay forecaster trend for next 30 days if scenario is future-looking
5) Circularity returns MCI≈0.58 (0.52–0.63)
6) UQ aggregator: if any PI width/mean > 0.30 → invoke RAG; else proceed
7) Report composed with sensitivities and (optional) optimization suggestions

---
This Section 2 is designed for performance, security, and maintainability, follows Clean Architecture boundaries, and integrates tightly with the existing RAG and Data Acquisition guides for a complete, production-ready AI layer.

