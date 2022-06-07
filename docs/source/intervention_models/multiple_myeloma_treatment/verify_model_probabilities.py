import pandas as pd, numpy as np
import joblib
from io import StringIO

# NDMM

ndmm_model = joblib.load('ndmm_model.pkl')

ndmm_X_to_predict = pd.DataFrame(pd.Series({
  'FirstTreatmentAge': 67.0,
  'Sex': 'M',
  'IsBlack': 0,
  'RenalImpairment': 0,
  'RiskType': 'Standard risk',
  'EcogValue': 0,
  'EligibilityProxy': 1,
  'Year': 16.0,
  'PracticeType': 'COMMUNITY',
})).T
ndmm_assignment_probs = pd.DataFrame(ndmm_model.predict_proba(ndmm_X_to_predict), columns=ndmm_model.classes_)
print(ndmm_assignment_probs)

ndmm_verification_output = pd.read_csv(StringIO("""Chemo+IMID+Dex,Chemo+PI+Dex,Chemo+PI+Dex+ASCT,Dara+IMID+Dex,Dara+PI+Chemo+Dex,Dara+PI+Chemo+Dex+ASCT,Dara+PI+IMID+Dex,Dara+PI+IMID+Dex+ASCT,IMID+Dex,PI+Dex,PI+IMID+Dex,PI+IMID+Dex+ASCT
0.0016129339451798135,0.0815282882581773,0.05122207967923396,0.005591987927010277,0.001806580204131534,0.00017568989775983544,0.015702210347912037,0.0013803719276894802,0.023314521312768833,0.03288373934781868,0.4359901755263417,0.3487914216259764"""))

print(ndmm_verification_output)

assert np.allclose(ndmm_assignment_probs, ndmm_verification_output)

# RRMM

rrmm_model = joblib.load('rrmm_model.pkl')

rrmm_X_to_predict = pd.DataFrame(pd.Series({
    # Invariant patient characteristics
    'FirstTreatmentAge': 67.0,
    'Sex': 'M',
    'IsBlack': 0,
    'RenalImpairment': 0,
    'RiskType': 'Standard risk',
    'PracticeType': 'COMMUNITY',
    # Things that change over time
    'TimeSinceFirstTreatment': 1,
    'Year': 17.0,
    'Duration_previous': 12.0,
    'RegimenClass_previous': 'PI+IMID+Dex',
    'PI_flag_previous': 1,
    'IMID_flag_previous': 1,
    'Chemo_flag_previous': 0,
    'Isa_flag_previous': 0,
    'Dara_flag_previous': 0,
    'Dex_flag_previous': 1,
    'Other_flag_previous': 0,
    'ASCT_flag_previous': 0,
    'LineNumber': 2,
    'PrecedingUnique': 3,
    'PrecedingShortUnique': 0,
})).T
rrmm_assignment_probs = pd.DataFrame(rrmm_model.predict_proba(rrmm_X_to_predict), columns=rrmm_model.classes_)
print(rrmm_assignment_probs)

rrmm_verification_output = pd.read_csv(StringIO("""Chemo+PI+Dex,Dara+IMID+Dex,Dara+PI+Dex,IMID+Dex,Isa+IMID+Dex,Isa+PI+Dex,Other,PI+Dex,PI+IMID+Dex
0.05367936880522077,0.1853413945827947,0.12856948577873328,0.10565003215944607,0.0,0.00022166903745851111,0.09619608476678124,0.16987234340968332,0.26046962145988195"""))

print(rrmm_verification_output)

assert np.allclose(rrmm_assignment_probs, rrmm_verification_output)
