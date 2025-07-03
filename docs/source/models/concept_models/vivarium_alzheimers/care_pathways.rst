.. _alzheimers_care_pathways:

Care Pathways and Healthcare Utilization
========================================

This page outlines the healthcare pathways and service utilization patterns modeled for individuals with Alzheimer's disease across different stages.

Overview
--------

The care pathways module captures healthcare service use, caregiver involvement, and resource utilization patterns that vary by disease stage, diagnosis status, and treatment exposure. This module provides essential inputs for economic impact assessment and healthcare planning.

Key Pathway Components
----------------------

**Diagnostic Pathways:**

- Biomarker testing and confirmatory procedures
- Neuropsychological assessment and imaging
- Specialist consultations and follow-up care
- Genetic counseling and family screening

**Treatment Pathways:**

- Medication management and monitoring
- Cognitive and behavioral interventions
- Caregiver education and support programs
- Care coordination and case management

**Long-term Care Pathways:**

- Community-based services and day programs
- Home health aide and personal care services
- Assisted living and memory care facilities
- Skilled nursing and hospice care

Healthcare Utilization by Disease Stage
---------------------------------------

.. list-table:: Healthcare Service Utilization Patterns
  :header-rows: 1

  * - Disease Stage
    - Primary Care Visits
    - Specialist Consultations
    - Diagnostic Testing
    - Long-term Care Services
  * - Preclinical AD (Undiagnosed)
    - Standard primary care
    - Minimal neurology contact
    - Routine cognitive screening
    - None
  * - Preclinical AD (Diagnosed)
    - Increased monitoring visits
    - Regular neurology follow-up
    - Annual cognitive assessment
    - Preventive interventions
  * - MCI due to AD
    - Quarterly monitoring
    - Multidisciplinary clinics
    - Comprehensive testing
    - Early support services
  * - Mild AD
    - Monthly clinical visits
    - Psychiatry consultation
    - Safety evaluations
    - Part-time home services
  * - Moderate AD
    - Bi-weekly monitoring
    - Emergency room visits
    - Behavioral management
    - Full-time care assistance
  * - Severe AD
    - Weekly medical care
    - Frequent hospitalizations
    - End-of-life planning
    - 24-hour supervised care

Caregiver Involvement and Burden
---------------------------------

**Informal Caregiving:**

- Family member involvement by disease stage
- Hours of care provided per week
- Impact on caregiver employment and health
- Financial burden on families

**Professional Caregiving:**

- Home health aide hours
- Adult day program utilization
- Respite care services
- Care coordination costs

.. list-table:: Caregiver Hours by Disease Stage
  :header-rows: 1

  * - Disease Stage
    - Informal Care Hours/Week
    - Professional Care Hours/Week
    - Total Care Cost (Monthly)
  * - Preclinical AD
    - 0-2
    - 0
    - Minimal
  * - MCI due to AD
    - 2-8
    - 0-5
    - Low
  * - Mild AD
    - 8-20
    - 5-15
    - Moderate
  * - Moderate AD
    - 20-40
    - 15-35
    - High
  * - Severe AD
    - 40+ or institutional
    - 35+ or 24-hour
    - Very High

Healthcare Costs by Service Category
------------------------------------

**Direct Medical Costs:**

- Primary care physician visits
- Specialist consultations (neurology, psychiatry)
- Diagnostic procedures and laboratory tests
- Prescription medications and monitoring
- Emergency department visits and hospitalizations

**Long-term Care Costs:**

- Home and community-based services
- Adult day programs and respite care
- Assisted living and memory care facilities
- Skilled nursing facility care

**Biomarker Testing Costs:**

- Blood-based biomarker tests
- Confirmatory imaging (PET, MRI)
- Genetic testing and counseling
- Follow-up monitoring and repeat testing

**Treatment-Related Costs:**

- Disease-modifying therapy medications
- Medication monitoring and management
- Treatment-related adverse event management
- Specialized intervention programs

Geographic and System Variations
---------------------------------

**Healthcare System Differences:**

- Availability of specialized AD services
- Coverage and reimbursement patterns
- Integration of care delivery models
- Access to experimental treatments

**Location-Specific Factors:**

- Urban vs. rural service availability
- Cultural attitudes toward dementia care
- Family structure and caregiving norms
- Economic development and healthcare infrastructure

Service Utilization Modeling Approach
--------------------------------------

**Utilization Equations:**

For each service category and disease stage:

.. math::

   \text{Utilization}_{i,s,t} = \text{Base Rate}_{s} \times \text{Location Factor}_i \times \text{Time Trend}_t

Where:

- i = individual simulant
- s = disease stage
- t = time period

**Cost Calculations:**

.. math::

   \text{Annual Cost}_{i} = \sum_{services} \text{Utilization}_{i,s} \times \text{Unit Cost}_{s,\ell}

**Key Parameters:**

.. list-table:: Care Pathway Parameters
  :header-rows: 1

  * - Parameter
    - Data Source
    - Variation
    - Notes
  * - Service utilization rates
    - Claims data, surveys
    - By stage, location
    - Age/sex standardized
  * - Unit costs
    - Medicare, commercial payers
    - By location, year
    - Inflation adjusted
  * - Caregiver hours
    - Time-use studies
    - By relationship, stage
    - Includes productivity losses
  * - Institutional placement rates
    - Administrative data
    - By severity, location
    - Family and economic factors

Integration with Disease Model
------------------------------

**Diagnosis Effects:**

- Biomarker-based diagnosis triggers enhanced monitoring
- Earlier intervention reduces long-term care needs
- Improved care coordination affects progression rates

**Treatment Effects:**

- Disease-modifying therapy requires regular monitoring
- Slower progression reduces high-intensity service needs
- Maintained function delays institutional placement

**Economic Feedback:**

- Healthcare costs influence treatment adherence
- Caregiver burden affects family treatment decisions
- System capacity constraints may limit service access

Output Specifications
---------------------

**Healthcare Utilization Outputs:**

- Service use rates by type, stage, and population group
- Total healthcare spending by payer and service category
- Caregiver time and informal care costs
- Quality-adjusted life years by diagnosis and treatment status

**Economic Impact Outputs:**

- Direct medical costs by disease stage and scenario
- Long-term care expenditures and financing
- Productivity losses for patients and caregivers
- Cost-effectiveness of early detection and intervention strategies

Validation and Calibration
--------------------------

**Data Sources for Validation:**

- Medicare claims and cost reports
- Health and Retirement Study
- National health survey data
- International healthcare utilization studies

**Calibration Targets:**

- Total healthcare spending for AD population
- Service utilization patterns by disease severity
- Caregiver burden and time allocation
- Healthcare cost trends over time

Limitations and Future Enhancements
-----------------------------------

**Current Limitations:**

- Limited data on preclinical AD care patterns
- Simplified caregiver burden modeling
- Static cost parameters without learning curves
- Uniform service availability assumptions

**Future Model Enhancements:**

- Dynamic caregiver availability and capacity
- Healthcare system adaptation to early diagnosis
- Technology-assisted care and remote monitoring
- Value-based care and alternative payment models