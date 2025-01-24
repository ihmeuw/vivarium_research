..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _minimum_viable_model:

================================
Designing a Minimum Viable Model
================================

.. contents::
   :local:
   :depth: 1

Often model concepts, especially those created from people outside our team, are 
large, sprawling, and inclusive of many different diseases, risks, interventions, 
and contingencies. They can also include needed updates to the Vivarium framework, 
data collection, analyses along the way, and yet undefined efforts. Due to the 
challenges in predefining the scale of work needed for a model, creating a timeline 
and scoping a project can be challenging.

Therefore, we propose here a way to create a minimum viable model, and an approach 
to preparation before modeling that can maximize the chances of success. 

To go through the steps of creating a minimum viable model (MVM), we use a subset 
of the MNCNH work as an example, including 2 interventions: AI assisted ultrasound 
and care for respiratory distress syndrome (RDS). 

**Step 1: Define the research question**

It’s important to spend time defining exactly what your research question is. This 
will help later as we determine what success can look like. Try to be as detailed 
as possible in the needs for the project, specifying any details the funder provided, 
as those might dictate what pathways are included in the model.

For our example, we came up with the following question: “How will the use of AI 
assisted ultrasound for pregnancies, and better care for respiratory distress syndrome 
(RDS) in newborns in Ethiopia impact antenatal and young child health outcomes? It’s 
important to consider the how the two interventions interact – will including both create 
synergies or will including one make the other less effective?” 

**Step 2: Define an all-inclusive causal diagram** 

The goal in this step is to be inclusive of everything we think might matter in real 
life, even things we don’t expect to be in the simulation or don’t expect to have data 
on (e.g., upstream factors like income or food security, correlation between risks, or 
possible contingencies). 

This concept model doesn’t have to be “pretty” since we won’t be sharing it publicly. 
Therefore, be sure to include some information on what components are new for Vivarium, 
or areas of uncertainty. You could color code these new additions or add text boxes like 
below including thoughts and contingencies. Custom components or data generation tasks 
take time and will be important considerations. Err towards completeness rather than a 
clean map! 

Here’s our example of the all-inclusive concept model diagram: 

.. image:: mvm_big.drawio.svg

**Step 3: Referring back to the research question, start pruning branches until you reach a “minimum” version of the model**

Now is when we start moving towards the model we will actually build, or your concept 
model diagram. The process of pruning will likely be iterative – with some branches 
being more obvious than others to remove. 

For our purposes, the definition of a “minimal” model is the minimum amount of model 
components to successfully answer your research question. This can be a bit of a 
gray area – there are almost always ways to make a model more accurate – so in designing 
the minimum model, think about if NOT including a component will make the results 
untrustworthy to the funders or other modelers. The line between a limitation and a 
necessary component is difficult to define, so sure to bring in teammates, the 
engineering team, and when appropriate the funders, to ensure that you end up 
with the right MVM. 

Here are some considerations to think about during pruning: 

* What risk/cause pathways make up the bulk of the impacts? 

  * If an intervention affects multiple risks, which are most essential? Do you need to include all of them? Are all causes essential to model success? Why or why not? 
* Discuss with engineers which components might be custom built and how that will impact approach 

  * Custom components take longer and are more challenging to debug 
  * Additionally, it is simplest if custom components do not need to be edited later in model building due to upstream changes 
* What is the benefit and cost of a model component in terms of ease of implementation and importance to getting the right answer? 
* What model components could you start building that are very unlikely to change later? 

For our example, we ended up with this model: 

.. image:: mvm_small.drawio.svg

For this project, we removed a few things: 

* The upstream effects, while likely real and important, lack data that is tied to risks or outcomes. We also expect to still get the right answer to the initial research question, even without this box. Therefore, we decided to remove this component. 
* After talking with our funders again, they had learned that the pathway through identifying small for gestational age children was unlikely to be impactful, and we decided together that we did not need to include it. 
* We also rejected the adjustment between “Obstructed labor and Uterine rupture” and “Encephalopathy due to birth asphyxia and trauma” due to lack of any data on this relationship being affected by facility type. 
* The funder provided data on RDS and its relationship to pre-term birth 
* While the healthcare system will be a custom component in Vivarium, it’s needed for the success of the project, and this was discussed with engineering 

**Step 4: Conduct any needed checks, finalize the MVM**

Often, before you can finalize the MVM, you need to do some checks. This might 
be things like looking for data on correlations or upstream effects, digging 
into GBD to understand if we can use their values directly, or building a 
nanosim to validate a potential modeling approach. 

These steps are important to ensure that model design is likely to work. Of 
course, we are unlikely to catch every potential roadblock ahead of time, and 
conducting checks can be time consuming! Try to timebox this step in order 
to ensure you spend some time exploring potential issues, but don’t go down 
a rabbit hole. 

From our example, we spent some time looking into DHS and other data sources 
to understand how attending ANC visits might be correlated with delivery in 
a higher-level facility. While the data wasn’t perfect, we ran a correlation 
analysis and found very significant correlation between access to these forms 
of care. Therefore, we decided that to capture the limitations of the AI assisted 
ultrasound, we would need to include this correlation in the model. 

**Step 5: Communicate final model approach**

Now that we have a finalized model, we can share that with others. First, 
schedule your concept model meeting in order to finalize the plans with the 
engineering team. Also share the planned approach with the funders. 

Be sure to highlight the reasons why the MVM was selected – why does this model 
successfully answer the research question? Why were other possible pathways 
rejected? – but also highlight the opportunities for improvements. If there are 
spots in the model that might be included later, call them out as “nice to haves” 
or areas for future growth. 

You might also create and share fake mock-ups of the type of data and graphs 
you’re likely to be able to get from the model. Often, this lets people see the 
limitations of a model and might generate helpful conversation with teammates and 
funders. 

**Step 6: Design a plan for building the model**

Once you have the MVM, it’s time to start building! The decision of what components 
to build first should be done in communication with the engineering team. However, 
a few considerations are below: 

* Think about opportunities to start small in your model: 

  * Can you use a less precise data value to get the model running initially? This will allow engineering to make progress while research completes data analysis tasks. 
  * Can you finish one pathway from intervention, through outcomes to start creating figures and communication plans early? 
* We often build models backwards (diseases, then risks, then interventions). However, this can sometimes be in conflict with a desire to get a complete model pathway running (from an intervention to an outcome). Chat with the engineering team to understand any anticipated modeling challenges as you design the workflow. 
* Be sure to communicate intermediate progress to the team and funders. While these don’t need to include results, information on the type of graphs, values, and limitations to be expected can surface issues far in advance! 
