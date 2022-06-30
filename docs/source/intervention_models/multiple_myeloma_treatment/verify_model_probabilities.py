import pandas as pd, numpy as np
import joblib
from io import StringIO

print('NDMM')

print('Naive')

ndmm_model_naive = joblib.load('ndmm_model_naive.pkl')
ndmm_naive_probs = pd.DataFrame(ndmm_model_naive.predict_proba(pd.DataFrame(index=[0])), columns=ndmm_model_naive.classes_)
print(ndmm_naive_probs)

ndmm_naive_verification_output = pd.read_csv('ndmm_model_naive_proba.csv')

print(ndmm_naive_verification_output)

assert np.allclose(ndmm_naive_probs, ndmm_naive_verification_output)

print('Sophisticated')

ndmm_model = joblib.load('ndmm_model.pkl')

ndmm_X_to_predict = pd.DataFrame(pd.Series({
  'FirstTreatmentAge': 67.0,
  'Sex': 'M',
  'RenalImpairment': 0,
  'RiskType': 'Standard risk',
  'Year': 16.0,
})).T
ndmm_assignment_probs = pd.DataFrame(ndmm_model.predict_proba(ndmm_X_to_predict), columns=ndmm_model.classes_)
print(ndmm_assignment_probs)

ndmm_verification_output = pd.read_csv('ndmm_verification_output.csv')

print(ndmm_verification_output)

assert np.allclose(ndmm_assignment_probs, ndmm_verification_output)

print('RRMM')

print('Naive')

rrmm_model_naive = joblib.load('rrmm_model_naive.pkl')
rrmm_naive_probs = pd.DataFrame(rrmm_model_naive.predict_proba(pd.DataFrame(index=[0])), columns=rrmm_model_naive.classes_)
print(rrmm_naive_probs)

rrmm_naive_verification_output = pd.read_csv('rrmm_model_naive_proba.csv')

print(rrmm_naive_verification_output)

assert np.allclose(rrmm_naive_probs, rrmm_naive_verification_output)

print('Sophisticated')

rrmm_model = joblib.load('rrmm_model.pkl')

rrmm_X_to_predict = pd.DataFrame(pd.Series({
    # Invariant patient characteristics
    'FirstTreatmentAge': 68.2,
    'Sex': 'M',
    # 'RenalImpairment': 0,
    # 'RiskType': 'Standard risk',
    # Things that change over time
    'TimeSinceFirstTreatment': 1.25,
    'Year': 17.25,
    'Duration_previous': 15.0 * 30.4,
    # 'RegimenClass_previous': 'PI+IMID+Dex+ASCT',
    'PI_flag_previous': 1,
    'IMID_flag_previous': 1,
    'Chemo_flag_previous': 0,
    'Isa_flag_previous': 0,
    'Dara_flag_previous': 0,
    'Dex_flag_previous': 1,
    'Other_flag_previous': 0,
    'ASCT_flag_previous': 1,
    'NumberOfComponents_previous': 4,
    'LineNumber': 2,
    # 'PrecedingUnique': 4,
    # 'PrecedingShortUnique': 0,
})).T
rrmm_assignment_probs = pd.DataFrame(rrmm_model.predict_proba(rrmm_X_to_predict), columns=rrmm_model.classes_)
print(rrmm_assignment_probs)

rrmm_verification_output = pd.read_csv('rrmm_verification_output.csv')

print(rrmm_verification_output)

assert np.allclose(rrmm_assignment_probs, rrmm_verification_output)
