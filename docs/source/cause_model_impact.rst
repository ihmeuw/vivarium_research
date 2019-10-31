===============================
Vivarium Research Documentation
===============================

Model impact 
-------------

1. **What is model impact**
 Model impact is about how causes affect mortality/disability
2. **Mortality**

 image:: hazard_ratio.png
  

 - Survival analysis: what is the probability that the time of death 
   is between now and the end of this time step, given that time of 
   death later than now. 

   morality rate :math:`\lambda=P(t < T_{death} <= t + \triangle_{t} | T_{death} > t) = 1 - e^{-\lambda\triangle t}`
   

 - In simulation, we take a uniform random number evenly distributed 
   between zero and one. If that number less than the probability, it 
   returns death. 
   
   answer: yes if :math:`u<= 1 - e^{-\lambda\triangle t}` else no
          
   where :math:`u \rightarrow  U[0,1]`
   
 - Use GBD data to estimate mortality rate (three cases)

   case 1: no cause models
    :math:`\lambda=ACMR`
   case 2: one cause model
    :math:`\lambda = ACMR - CSMR + EMR(disease\_status)`
   case 3: multiple causes model 
    :math:`\lambda_{i} = ACMR - \sum_{diseases}CSMR_{c} + \sum_{diseases}EMR_{c}(disease\_status_{c})`
   what did the person die of
    :math:`P_{c} = \frac{EMR_{c}}{CDMR + \sum_{diseases}EMR_{c}(disease\_status_{c})}`
	
   Note: 
        - All cause mortality rate (ACMR)
        - Cause specific mortality rate (CSMR)
        - Excess mortality rate (EMR)

3. **Disability** 

 - Years lived with disability (YLD): This includes conditions such as influenza, which may last for only a few days, or epilepsy, which can last a lifetime. It is measured by taking the prevalence of the condition multiplied by the disability weight for that condition. 

 - Disability weights represent the severity of health loss  associated with a health state. Disability weights reflect the severity of different conditions.

       :math:`Disability\_weight_{c}`: proportion of health lost due to condition c
        
       :math:`(1 - Disability\_weight_{c})`: proportion of health remaining when living with condition c
       
       :math:`\prod_{c\in causes}(1 - Disability\_weight_{c})`: proportion of health remaining when living with all causes

       :math:`1 - \prod_{c\in causes}(1 - Disability\_weight_{c})`: proportion of health lost due to causes
