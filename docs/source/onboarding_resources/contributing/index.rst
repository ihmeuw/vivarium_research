.. _contributing:

==============================
Contributing New Documentation
==============================

.. contents::
   :local:

This document is designed to guide someone through their first time contributing 
documentation to Vivarium Research. This process can be confusing though, so please 
ask a friend on the team for help if needed or to clarify any questions!! 

Useful links
------------

Our documentation is written using reStructuredText and Sphinx. These are ways of writing 
text to include formatting and structure to documents. The following
links provide a description of how to structure your docs so they render
correctly.

- `reStructuredText reference <http://docutils.sourceforge.net/docs/user/rst/quickref.html>`_
- `Sphinx reference <http://www.sphinx-doc.org/en/master/contents.html>`_.

Clone Vivarium Research and make a new environment
--------------------------------------------------

If you want to add or modify documentation, you'll first need to clone and
install this repository.  As always, you should do this in a clean environment.

Start by opening the terminal of your choosing. If you want more information on 
this, check out this :ref:`page on terminals <terminal_access>`. Then enter 
the commands below. 

::

   $> conda create -y --name=vivarium_research python=3.8
   $> source activate vivarium_research
   (vivarium_research) $> git clone https://github.com/ihmeuw/vivarium_research.git
   (vivarium_research) $> cd vivarium_research
   (vivarium_research) $> pip install -r requirements.txt

At this point, a folder called vivarium_research should be added to your computer and 
accessible from your file explorer. 

Make a new git branch
---------------------

The first step to modifying the documentation is to checkout a new branch
with ``git``::

   (vivarium_research) $> git checkout -b YOUR-BRANCH-NAME

The ``YOUR-BRANCH-NAME`` is the name of your branch, and you should try to
be descriptive.  For example, if you're adding new documentation about an
ischemic heart disease model, you might call your branch ``ihd-model``.

Make sure you have pulled any recent updates from the main branch before 
creating your new branch! 

Modify the documentation
------------------------

To make updates to the documentation, you should add or modify the
``.rst`` files in the ``vivarium_research/docs/source/`` directory.  Our documentation is written
using `reStructuredText <http://docutils.sourceforge.net/docs/user/rst/quickref.html>`_
and `sphinx <http://www.sphinx-doc.org/en/master/contents.html>`_.  Keep those
links handy for reference.

Use your favorite text editor for this part. If you want some recommendations on a text 
editor from your teammates, check out the text editor section in this page on 
:ref:`computing tools <computing_interfaces>`.

Reviewing your changes
----------------------

Once you've made your modifications, you can build them to see how they look. 
Often, people use Miniconda for building pages. More information can be found 
in this page for :ref:`computing tools <computing_interfaces>`.

Use these commands to build your page with edits: 

::

   (base) $> cd vivarium_research/docs
   (base) $> conda activate vivarium_research ##This line is only needed if vivarium_research has not been activated yet
   (vivarium_research) $> make html

This will create a new ``build`` sub-directory with the new documentation
rendered in html.  You can open the file `vivarium_research/docs/build/html/index.html` in your
browser to view your changes. 

Note that some errors will appear as warnings in Miniconda, but will actually cause the build to 
fail in GitHub. These include issues like duplicated references. Be sure to check for and correct 
any warnings you may get before moving on! 

Push your changes
-----------------

Once you're satisfied, you should push your changes to the remote repository
(the one on GitHub).  Make sure you're in the main `vivairum_research`
directory and run::

   (vivarium_research) $> git add .
   (vivarium_research) $> git status ##Not essential, but helpful to check that you are including the right edits
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
--------------------------------

The last part of the process is to submit a pull request.  You do this on
GitHub itself.  Open up the
`vivarium_research repository <https://github.com/ihmeuw/vivarium_research>`_
in your browser.  Click on the ``Branches`` tab right above the directory tree.
You should see a listing for your branch with a button that says
``Make pull request``.  Click that.  **Add reviewers** and **add tags** then click the
``Create Pull Request`` button and notify the people you tagged that you
have a documentation PR for review.

People should respond with either approval, changes, or comments.  You should
respond to all the feedback and make updates to your pull request if necessary
and re-request reviews. Once everyone has responded and is happy (or has, at
least, marked your PR as approved), you can click the ``Merge Pull Request``
button and add your docs to the master branch.
