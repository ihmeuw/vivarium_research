.. _2019_risk_exposure_maternal_bmi:

======================================
Maternal Body Mass Index
======================================

Risk Exposure Overview
----------------------

Maternal nourishment status during pregnancy is associated with child health outcomes such as infant birthweight. Further, maternal nourishment is highly correlated with additional risk exposures that may be related to household food insecurity. 

Maternal weight is often measured using body mass index (BMI), defined as weight in kilograms divided by the square of height in meters. BMI is categorized by the World Health Organization as follows (`and found here <https://www.who.int/data/nutrition/nlis/info/malnutrition-in-women>`_):

.. list-table:: BMI thresholds and consequences in women (WHO)
   :widths: 5 5 20
   :header-rows: 1

   * - BMI
     - Category
     - Consequence
   * - <17.0
     - Thinness
     - A BMI <17.0 indicates thinness in adult populations. It has been clearly linked to increases in illness in adults studied in three continents; therefore, it is a reasonable value to choose as a cut-off point for moderate risk. A BMI <16.0 is known to be associated with a markedly increased risk for ill-health, poor physical performance, lethargy and even death; therefore, this cut-off point is a valid extreme limit.
   * - <18.5
     - Underweight
     - The cut-off point of a BMI of 18.5 for underweight in both genders has less experimental validity as a cut-off point for thinness, but is a reasonable value for use pending further comprehensive studies. The proportion of the population with a low BMI that is considered to be a public health problem is closely linked to the resources available for correcting the problem, the stability of the environment and government priorities. About 3–5% of a healthy adult population has a BMI <18.5.
   * - 18.5-24.9
     - Normal weight
     - 
   * - >=25
     - Overweight
     - A BMI ≥25 signifies overweight; it is a major determinant of many NCDs (e.g. non-insulin-dependent diabetes mellitus, coronary heart disease and stroke), and it increases the risks for several types of cancer, gallbladder disease, musculoskeletal disorders and respiratory symptoms. In some populations, the metabolic consequences of weight gain start at modest levels of overweight.
   * - >=30
     - Obese
     - A BMI ≥30 signifies obesity, which is a disease that is largely preventable through lifestyle changes. The costs attributable to obesity are high, not only in terms of premature death and health care, but also in terms of disability and a diminished quality of life.

Risk Exposures Description in GBD/DHS
----------------------------------------

Maternal underweight is not modeled as a GBD risk factor. Instead, maternal underweight is estimated in GBD through two covariates. 

- Covariate #1252: Age standardized covariate for underweight women of reproductive age (10-54) with underweight for women under age 20 defined by <-2 BMI z scores and for women over age 20 as <17 BMI

- Covariate #1253: Age specific covariate for underweight women. Note: underweight for women under age 20 defined by <-2 BMI z scores and for women over age 20 as <17 BMI.

Demographic and Health Surveys report nationally representative estimates of several parameters related to population, health, and nutrition in low and middle income countries. As part of their estimates of nutrition of children and adults, they report BMI (mean, as well as percent below/above threshold values) among women 15-49 years of age by 5-10 year age group, residence (urban/rural), region, education, and wealth quintile.

We chose to inform the maternal BMI distribution from DHS surveys rather than GBD covariate because:

- The BMI threshold of 18.5 reported in DHS is more commonly used than the BMI threshold of 17 in the GBD covariate

- The DHS surveys are publically available and the GBD covariate estimates and methods are not published

Vivarium Modeling Strategy
--------------------------

The following risk exposure vivarium modeling strategy is intended to apply to mothers or children separately rather than to mother-child dyads.

Maternal BMI should be implemented as a **dichotomous** risk exposure. The exposed group is BMI<18.5 and the TMREL is BMI>=18.5. 

When modeling children, the exposure should be assigned at birth or upon initialization at the start of the simulation according to the probability listed in the table below. The TMREL exposure category should be assigned according to the probability equal to 1 minus the exposed probability.

.. list-table:: Risk exposure values
   :header-rows: 1

   * - Location
     - Population
     - Exposure category
     - Value
     - Note
     - Source
   * - Ethiopia
     - General
     - Exposed (BMI<18.5)
     - 0.224 (95% CI: 0.217, 0.231)
     - Assume normal distribution of uncertainty clipped at 0 and 1. Confidence interval calculated as :math:`\pm 1.96 \times \sqrt{\frac{p \times (1 - p)}{n}}`
     - Ethiopia 2016 DHS

.. list-table:: Risk Exposure Restrictions: Children
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - Age group start
     - Birth
     - Age group ID 164
   * - Age group end
     - 5
     - Chosen for simplicity, but could extend later in life depending on research objectives.

Assumptions and limitations
++++++++++++++++++++++++++++

#. The estimates of BMI are specific to all women of reproductive age rather than mothers, which could result in exposure misclassification.

#. We assume that the maternal BMI risk exposure distribution does not vary by child age group. In reality, as maternal BMI is likely associated with childhood mortality, exposure to maternal BMI<18.5 is likely greater among younger children than among older children.

#. We do not consider variations of maternal BMI by maternal age, region, wealth quintile, or residence, although exposure varies according to these factors.

#. We model the maternal BMI risk exposure as dichotomous with a TMREL of >=18.5. However, given that high BMIs are associated with negative health outcomes, this may not be the most appropriate TMREL definition. 

Validation Criteria
+++++++++++++++++++

The risk exposure in the model outputs should approximately equal (in terms of mean and uncertainty interval) the value inputs in the data table above.
