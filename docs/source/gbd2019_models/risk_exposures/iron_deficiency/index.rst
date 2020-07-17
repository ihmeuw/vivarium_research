.. _2019_risk_exposure_iron_deficiency:

===============
Iron Deficiency
===============

Risk Exposure Overview
----------------------

Generally, **anemia** is a condition defined by a deficiency of red blood cells
or a deficiency of hemoglobin in the blood. Anemia is typically classified by
hemoglobin concentrations below a defined threshIronold that varies by age and sex.
Severity of anemia is similarly classified according to ranges of hemoglobin
concentrations. Anemia is associated with increased morbidity and mortality and
symptoms of anemia often include weakness, fatigue, and difficulty
concentrating [Kassebaum-et-al-2016]_.

 Notably, anemia may be caused by many diverse factors. Examples of factors
 that may cause anemia include genetic mutations in hemoglobin genes, acute or
 chronic blood loss, altered red blood cell morphology, inadequate nutritional
 intake, and others [Kassebaum-et-al-2016]_.

**Iron deficiency anemia** is a type of anemia that is due to insufficient
iron levels, which lead to a deficiency of hemoglobin in the blood. Notably,
iron deficiency anemia can occur when dietary intake of iron is insufficient or when there is excess loss of iron from the body (ex: menstrual disorders, hookworm disease, etc.). Iron deficiency anemia is the most common cause of anemia globally in most
populations and will respond to iron supplementation.

**Dietary iron deficiency anemia** is a specific type of iron deficiency anemia
that is due to inadequate dietary intake of iron, leading to inadequate iron
levels in the body and a subsequent deficiency of hemoglobin in the blood.

Risk Exposure Description in GBD
--------------------------------

Iron deficiency in the GBD risk factors is defined as **inadequate iron to meet the body's needs** and is quantified in terms of mean hemoglobin concentration at the population level from the cumulative effect of all causes that lead to iron deficiency, including dietary iron deficiency (GBD *cause* of inadequate intake of elemental iron) as well as other causes that manifest as iron deficiency (eg, maternal hemorrhage, uterine fibroids, menstrual disorders, hookworm, schistosomiasis, gastritis and duodenitis, inflammatory bowel
disease, etc.).

In the Global Burden of Disease study, iron deficiency exposure is represented as a **continuous ensemble distribution of hemoglobin concentration in the population.** The theoretical minimum risk exposure level (TMREL) for the iron deficiency risk factor is specific to each demographic group in GBD 2019 and is the *implied mean hemoglobin concentration in the population if there were no iron deficiency*, which is used to calculate population attributable fractions due to iron deficiency. The TMREL was calculated by summing cause-specific hemoglobin shifts time the prevalence for all causes classified as iron-responsive and then adding that sum to the observed hemoglobin concentration for each population group.

.. todo::

  Include list of all causes with cause IDs and sequela IDs, REI hierarchy, etc.

Notably, the iron deficiency risk factor should be distinguished from the dietary iron deficiency cause in GBD 2019 (there is a PAF of 1 relationship between the dietary iron deficiency cause and the iron deficiency risk factor). The iron deficiency risk factor also affects maternal causes. These relationships are discussed in the `Iron Deficiency Risk Effects Document <2019_risk_effects_iron_deficiency_>`.

.. todo::
  
  Make the risk effects page so that this link will work :) 

Further, the iron deficiency risk factor is modeled in tandem with the **anemia impairment**, discussed below.

Anemia Impairment
+++++++++++++++++

The anemia impairment is modeled in two steps, 1) the anemia envelope and 2) causal attribution. 

Anemia Envelope
^^^^^^^^^^^^^^^

The anemia envelope represents the total anemia burden for a population and was estimated from a variety of sources reported as either anemia prevalence and/or mean and standard deviation hemoglobin concentration; altitude adjustments were made when appropriate and possible, although no smoking adjustments were performed. For data sources that *only* included pregnant women, data were crosswalked to the general population using MR-BRT such that pregnant women were matched to non-pregnant women in the same age and location group and the ratios of their hemoglobin concentrations were assessed. The resulting adjustment factor was 0.92 (95% CI: 0.86 - 0.98), such that the hemoglobin level of pregnant women is 0.92 times that of non-pregnant women.

The anemia envelope was modeled in four steps:

1. ST-GPR models of mean and standard deviation hemoglobin concentration (including pregnancy adjustments as described above). 

    Covariates for the mean model included Age-specific Fertility Rate, HIV Prevalence, SEV for Child underweight, SEV for Child wasting, Malaria Incidence, Haemoglobin C (sickle type C) trait (all ages), Haemoglobin S (sickle type S) trait (all ages), Sociodemographic Index, SEV for Impaired kidney function, Healthcare Access and Quality index, Modern contraception prevalence, and 50th percentile of haemoglobin (pooled across all microdata sources). 

    Covariates for the standard deviation model included: Malaria Incidence, Haemoglobin C (sickle type C) trait, Haemoglobin S (sickle type S) trait, Sociodemographic Index, SEV for Impaired kidney function, Healthcare Access and Quality index, Education Relative Inequality (Gini), 50th percentile of haemoglobin (pooled across all microdata sources), and mean haemoglobin (results from mean [Hb] ST-GPR model)

2. Calculation of ensemble weights
    
    A set of two-parameter distributions (gamma, mirror gamma, Weibull, mirror lognormal, and mirror gumbel) were fit to the sample’s haemoglobin mean and variance for each location/year/age/sex group

3. Generation of ensemble distributions for each location/year/age/sex group

    Because anemia thresholds depend on pregnancy status, hemoglobin distributions were modeled separately for pregnant and non-pregnant females. The pregnancy model was identical to the non-pregnancy model except that the mean and variance were adjusted by the adjustment factor. THe prevalence of anemia in pregnant women and non-pregnant women were then weighted by the pregnancy rate and combined to estimate population anemia prevalence.

      The pregnancy rate was represented as :math:`(ASFR + SB) * 46/52`, where :math:`ASFR` is the location- and age-specific fertility rate and :math:`SB` is the location-specific stillbirth rate.

4. Calculating the area under the curve to calculate anemia prevalence. This was done using the WHO thresholds defined below:

.. _`WHO hemoglobin tresholds table`:

.. list-table:: WHO Hemoglobin Thresholds (g/L)
  :widths: 15, 15, 15, 15
  :header-rows: 1

  * - Group
    - Mild Anemia
    - Moderate Anemia
    - Severe Anemia
  * - Males and Females <28 days
    - 130-149
    - 90-129
    - <90
  * - Males and Females 1 month - 4 years
    - 100-109
    - 70-99
    - <70
  * - Males and Females 5-14 years
    - 110-114
    - 80-109
    - <80
  * - Males 15+ years
    - 110-129
    - 80-109
    - <80
  * - Females 15+ years, non-pregnant
    - 110-119
    - 80-109
    - <80
  * - Females 15+ years, pregnant
    - 100-109
    - 70-99
    - <70

.. note::

  GBD 2019 used a different threshold for the neonatal period than the rest of the <5 age group, although there are not any internatioanl guidelines on appropriate thresholds of anemia in neonates. The thresholds chosen were "a blend" of those recommended by the WHO for 6 to 59 months and the higher hemoglobin levels typically seen in newborns.

Causal Attribution
^^^^^^^^^^^^^^^^^^

While the anemia envelope represents the total prevalence of anemia, the causal attribution process allows for estimation of what conditions *cause* that anemia. With some exceptions (see below_), two inputs were required for each cause included in the causal attribution process, 1) the cause prevalence (generated from other GBD processes), and 2) the cause-specific hemoglobin shift. Cause-specific hemoglobin shifts were derived from published studies that compared hemoglobin concentrations among diseased and non-diseased populations; these shifts were meta-analyzed for use in GBD 2019.

.. note::

  The hemoglobin shift for iron deficiency was estimated to be **4.01 g/L** based on the meta-analysis of nine iron fortification trials.

.. _below:

Notably, there were several causes that were not assigned specific hemoglobin shifts, including dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias. Instead, the residual anemia envelope (with an enforced minimum 10%) were assigned to these causes in a manner analogous to fixed proportion redistribution.

A complete list of the causes included in the causal attribution process for anemia include: 

  P. falciparum parasitaemia without clinical malaria; P. vivax parasitaemia without clinical malaria; Clinical malaria; Schistosomiasis; Hookworm disease; Other neglected tropical diseases; Maternal haemorrhage; Vitamin A deficiency (under 15 years only); Other infectious diseases; Peptic ulcer disease; Gastritis; Stage III chronic kidney disease ; Stage IV chronic kidney disease ; Stage V chronic kidney disease ; End stage renal disease; Uterine fibroids; Menstrual disorders; Other haemoglobinopathies and haemolytic anaemias; Other endocrine, nutrition, blood, and immune disorders; G6PD deficiency; Hemizygous G6PD deficiency; Beta-thalassaemia major; Beta-thalassaemia trait; Haemoglobin E trait; Haemoglobin E/beta-thalassaemia; Haemoglobin H disease; Homozygous sickle cell and severe sickle cell/beta-thalassaemia parent; Haemoglobin SC disease; Mild sickle cell/beta-thalassaemia; Sickle cell trait; HIV; Cirrhosis and other chronic liver diseases, decompensated; Ulcerative colitis; Crohn’s disease; dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias.

.. todo::

  Move this into table?

Vivarium Modeling Strategy
--------------------------

Include here an overview of the Vivarium modeling section

Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Risk Exposure Model Diagram
++++++++++++++++++++++

Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

As of 02/10/2020: follow the template created by Ali for Iron Deficiency, copied 
below. If we discover it's not general enough to accommodate all exposure types,
we need to revise the format in coworking. 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - 
	  - 
	  - 

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - 
	  - 
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
----------