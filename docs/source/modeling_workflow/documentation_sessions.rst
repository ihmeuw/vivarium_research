.. _process_documentation:

======================
Documentation Sessions
======================

The Simulation Science team uses weekly documentation sessions to organize
and produce high-quality documentation of our modeling process.  These sessions
offer an opportunity for team members to share ideas and modeling techniques
and to formalize those techniques that we've found especially successful.


.. contents:
   :local:
   :depth: 1


The process
-----------

Our general process for the documentation sessions and the generation of
new documentation is as follows:

1. **Topic Kickoff** - One team member gives a broad topic overview
   presentation. This presentation will usually span about an hour with
   time for questions and clarification. The goal is to lay out enough
   information for the next step.
2. **Sub-topic Assignment** - The team takes the presented topic and identifies
   sub-topics within within it. We briefly discuss important issues to address
   within each of the sub-topic and assign the sub-topics to team members
   (they become the sub-topic owner).
3. **Sub-topic Preparation** - The sub-topic owners produce a 10-20 minute
   presentation on their sub-topic over the course of the  next week or two.
4. **Sub-topic Presentations** - The team reconvenes for 1-2 hours to give
   detailed presentations on each topic and have discussions about them, with a
   focus on identifying unanswered questions. Presentation formats are up to
   the sub-topic owner.
5. **Documentation Draft** - After their presentation on a sub-topic, each
   team member produces documentation in .rst format, containing a written
   version of the 10-20 minute presentation and the questions and answers from
   the ensuing discussion. See the :ref:`contribution guide <contributing>` for
   resources about writing and building the documentation.
6. **Documentation Feedback** - Other team members review the pull request for
   accuracy and formatting *within a business day or two*.  Ideally, everyone
   reviews the docs, but at least two people must review and submit approval.
7. **Documentation Finalization** - The sub-topic owner incorporates feedback
   and re-requests reviews if the feedback involves big changes.
8. **Merge and Update** - Once the sub-topic owner has at least two approving
   reviews and has incorporated any feedback, they merge the finalized docs
   into the repository. Automated fancy magic then updates the
   `hosted documentation <https://vivarium-research.readthedocs.io/en/latest/>`_.


A silly but hopefully helpful example
-------------------------------------

1. **Topic Kickoff** - James gives and overview of building cause models.
2. **Sub-topic Assignment** - Collectively, the team identifies the sub-topics
   and we assign them to research team members:
   
   - Cause Modeling Overview: Abie
   - Modeling with State Machines: James
   - Disease states, transitions, and their data sources: Ali
   - Disease effects/impacts and their data sources: Yaqi
   - Cause Model validation: Yongquan
   
3. **Sub-topic Preparation** - Everyone spends 3-6 hours over the next two
   weeks producing presentations, meeting during office hours/coworking to
   discuss thorny issues and resolve questions.
4. **Sub-topic Presentations** - We reconvene, and give each other
   presentations and discuss questions and identify unknown issues with the
   sub-topics. The state machine presentation turns out to be too technical,
   so James agrees to revise and incoporate more explanatory material (e.g.
   pictures & narrative descriptions) in the submitted docs.  Cause validation
   turns out to be a much bigger sub-topic than anticipated and Yongquan agrees
   to focus on prevalence validation for the docs and we split up the rest of
   validation into sub-topics for later sessions.
5. **Documenation Draft** - Everyone writes up their docs on over the next
   week, stopping by office hours for formatting questions. Sub-topic owners
   write their docs on a branch of this repository called
   ``cause/<sub-topic>``.  E.g. Abie works on ``cause/overview`` and Ali works
   on ``cause/disease-states-and-transitions``. Team members push their
   branches to this repository on github and submit a pull request to the
   ``master`` branch.
6. **Documentation Feedback** - Abie is out of town on business things and
   Yongquan is working on a super important deadline and so get postponed a 
   bit, so Ali, Yaqi, and James review each other's pull requests and submit
   feedback. Everyone's PRs look great. Ali and Yaqi get some minor formatting
   suggestions along with approvals. James get's asked a question about
   transitions he didn't include and doesn't get approved.
7. **Documentation Finalization** - Ali and Yaqi fix formatting issues and
   move on to 8.  James writes up an extra section about transitions and
   re-submits for review, moving back to 6.
8. **Merge and Update** - Everyone merges their docs!
