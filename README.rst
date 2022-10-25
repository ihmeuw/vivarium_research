=================
Vivarium Research
=================

.. image:: https://readthedocs.org/projects/vivarium-research/badge/?version=latest
   :target: https://vivarium-research.readthedocs.io/en/latest/?badge=latest
   :alt: Documentation Status

Here you'll find a variety of useful information about working on ``vivarium``
research projects.

The hosted documentation can be found at
`https://vivarium-research.readthedocs.io/en/latest/
 <https://vivarium-research.readthedocs.io/en/latest/>`_.

.. contents::

Contributing
------------

If you want to add or modify documentation, you'll first need to clone and
install this repository.  As always, you should do this in a clean environment.

::

   $> conda create -y --name=vivarium_research python=3.8
   $> conda activate vivarium_research
   (vivarium_research) $> git clone git@github.com:ihmeuw/vivarium_research.git
   (vivarium_research) $> cd vivarium_research
   (vivarium_research) $> pip install -r requirements.txt

Updating the Documentation
++++++++++++++++++++++++++

Make a new git branch
^^^^^^^^^^^^^^^^^^^^^

The first step to modifying the documentation is to checkout a new branch
with ``git``::

   (vivarium_research) $> git checkout -b YOUR-BRANCH-NAME

The ``YOUR-BRANCH-NAME`` is the name of your branch, and you should try to
be descriptive.  For example, if you're adding new documentation about an
ischemic heart disease model, you might call your branch ``ihd-model``.

Modify the documentation
^^^^^^^^^^^^^^^^^^^^^^^^

To make updates to the documentation, you should add or modify the
``.rst`` files in the ``docs/source/`` directory.  Our documentation is written
using `reStructuredText <http://docutils.sourceforge.net/docs/user/rst/quickref.html>`_
and `sphinx <http://www.sphinx-doc.org/en/master/contents.html>`_.  Keep those
links handy for reference.

Once you've made your modifications, you can build them to see how they look.

::

   (vivarium_research) $> cd docs
   (vivarium_research) $> make html

This will create a new ``build`` sub-directory with the new documentation
rendered in html.  You can open the file `docs/build/html/index.html` in your
browser to view your changes.

Push your changes
^^^^^^^^^^^^^^^^^

Once you're satisfied, you should push your changes to the remote repository
(the one on GitHub).  Make sure you're in the main `vivairum_research`
directory and run::

   (vivarium_research) $> git add .
   (vivarium_research) $> git commit -m "Your commit message here."
   (vivarium_research) $> git push

Your commit message should describe the changes you made to the documentation.
You can make multiple commits to your branch, and that's frequently a very good
idea.  The first time you push your branch to the remote repository, you'll
have to tell ``git`` which branch to push to.  Instead of just running
``git push``, you'll run::

   (vivarium_research) $> git push --set-upstream origin YOUR-BRANCH-NAME

Don't worry if you forget.  ``git`` will remind you.

Submit a pull request for review
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The last part of the process is to submit a pull request.  You do this on
GitHub itself.  Open up the
`vivarium_research repository <https://github.com/ihmeuw/vivarium_research>`_
in your browser.  Click on the ``Branches`` tab right above the directory tree.
You should see a listing for your branch with a button that says
``Make pull request``.  Click that.  

**Add reviewers and relevant labels**, then click the
``Create Pull Request`` button and notify the people you tagged that you
have a documentation PR for review.

People should respond with either approval, changes, or comments.  You should
respond to all the feedback and make updates to your pull request if necessary
and re-request reviews. Once everyone has responded and is happy (or has, at
least, marked your PR as approved), you can click the ``Merge Pull Request``
button and add your docs to the main branch.

Protocol for adding reviewers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the research team:
'''''''''''''''''''''''

For pull requests that are project-specific, you should request review from 
all members of the research team involved with that project. For more general 
pull requests that apply to overall Vivarium protocols and/or framework, etc., 
you should request review from all members of the research team.

From the engineering team:
''''''''''''''''''''''''''

Always tag engineers working on a given project for pull requests related to 
that project. This will allow the engineering team members to stay informed of 
project development and ask clarifying questions as necessary. The only 
potential exception is for pull requests that only contain information on 
research background and do not contain any information related to modeling 
strategy.

Engineering team members on a given project should be tagged as **required** 
reviewers when a pull request contains any changes that:

* Were requested by engineering, or
* Affects modeling strategy that has already been implemented and therefore
  requires code changes by the engineers
  * In this case, the research team member who made the pull request is
    responsible for making a ticket on the
    `engineering JIRA board <https://jira.ihme.washington.edu/secure/RapidBoard.jspa?rapidView=305&view=planning.nodetail&selectedIssue=MIC-3449&epics=visible&issueLimit=100&selectedEpic=MIC-3420>`_
    that outlines the requested code changes. The research team member should
    then post a slack message in the project-specific channel that tags the
    engineers and links to the new JIRA ticket.

**TODO:** Post more details on best practice for making tickets when available.
