.. _2023_sbp_ldlc_fpg_bmi:

-------------------------------------------------------
SBP, LDL-C, FPG, and BMI Risk Factor Correlation - 2023
-------------------------------------------------------

Risk Exposure Overview
----------------------

SBP, LDL-C, FPG, and BMI are all continuous risk exposures that affect 
different cardiovascular disease outcomes. In the 2023 model for 
CVD, these outcomes are heart failure incidence, myocardial infarction, and 
ischemic stroke. 

It is also known that these 4 risks are correlated in the population. To properly 
account for the uneven distribution of risk, we are including a correlation between 
the relevant risk factors (more detail on which are included below). 

Risk Exposures in GBD 
----------------------

Links to documentation for relevant risk exposure pages include:

- :ref:`SBP risk exposure <2019_risk_sbp>`

- :ref:`LDL-C risk exposure <2019_risk_exposure_ldl>`

- :ref:`FPG risk exposure <2019_risk_exposure_fpg>`

- :ref:`BMI risk exposure <2019_risk_bmi>`

Vivarium Modeling Strategy
----------------------------

Correlation
++++++++++++

Correlation for all risk factors was derived from NHANES data. The dataset included 
surveys between 1988 and 2018. The data was examined and correlation coefficients were calculated in
the `R file here <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/correlation.R>`_. 

We saw that there was a relationship between age and correlation coefficient for some 
of the variables. This can be visualized in the graphs below. All graphs have age on the x-axis 
and the correlation coefficient on the y-axis. 

.. image:: correlation_graphs.png

With our clinical expert, we used this information and decided that the correlation 
would be included in the following way: 

- For SBP and BMI, correlation would be age specific 
- For SBP/LDL-C, SBP/FPG, LDL-C/BMI, and FPG/BMI the age effects were limited and thought to be primarily noise. Therefore they are included at an overall level, not age specific. 
- LDL-C and FPG were not statistically significantly correlated for most ages and therefore correlation was set to 0 

The correlation was then recalculated based on the above (age specific or not) 
and the final values for correlation coefficients are stored in the csv file 
here: /ihme/costeffectiveness/artifacts/vivarium_nih_us_cvd/raw_data/correlation.csv 

The correlation is then used to create propensity values for all simulants. Therefore, the 
correlation will continue to be the same even as simulants age and their risk exposure values 
change. 

This is accomplished using a multivariate normal distribution with a defined 
correlation matrix matching our calculated correlation coefficients. From the 
multivariate, a cdf function is used to convert the values into a uniform distirbution 
between 1 and 0 with the same correlation between variables. 

The calculations are done `in this notebook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/Correlation_Testing.ipynb>`_. This code can be used to generate propensity 
values for any number of simulants. 

Assumptions and Limitations
++++++++++++++++++++++++++++++

#. We assign a correlation at initialization that does not change over time. For SBP and BMI which we model to change over time, this means that as simulants age, they will retain their original correlation and increasly differ from the true correlation. 

#. To calculate the correlation, we limited the population to only untreated individuals. However, as our simulants receive treatments their risk exposure values will change and likely make validation more challenging. 

Validation Criteria
+++++++++++++++++++++

#. The exposure distribution for all risks in the baseline scenario should continue to validate to the GBD exposure distribution

#. The correlation we see with risk exposures should roughly match input values with the limitations listed above 
