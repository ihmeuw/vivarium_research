.. _computing:

==================================
Computing References and Resources
==================================
..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

.. contents::
  :local:
  :depth: 3

.. _computing_interfaces:

1.0 Interfaces and how they interact:
+++++++++++++++++++++++++++++++++++++

There are many different computing systems used at IHME and on Sim Science 
in particular. Many of these systems have their own trainings and in-depth 
resources available on the Hub or IHEM Learn. Here, we seek to give an 
overview of how these systems interact and helpful links to other sources 
of information. 

It is worth noting that versions of this document exist for other teams on 
the Hub such as the `Cancer team <https://hub.ihme.washington.edu/display/CT/Setting+Up+Your+System>`_, 
and the `Demography team <https://hub.ihme.washington.edu/pages/viewpage.action?pageId=83205636>`_. 
This document seeks to add in Sim Science specific information and common practices. 

**The Cluster:** a group of interconnected computers that work together to 
perform computationally intensive tasks. For researchers on sim science, 
the most common task we use the cluster for is opening Juptyer notebooks 
to run code. We will go into more depth on this task below. 

For general information on the cluster, please see the Module 3 within the 
IHME Learn training `Computational Infrastructure Level 1 <https://ihme.brightspace.com/d2l/home/7028>`_.

**How to Access the cluster:** The cluster can be accessed from most terminals 
on your computer. Some of the most popular ones used are: PuTTY or Bitvise for 
PC users and Terminal or iTerm2 for Mac users. For PC users, most researchers use PuTTY, 
however Bitvise is also used at IHME. For Mac users, the Terminal app comes installed 
on your computer but some perfer to use iTerm2. 

Link to download `PuTTY or Bitvise <https://www.putty.org/>`_
Link to download `iTerm2 <https://iterm2.com/>`_

**GitHub:** GitHub is an internet hosting service we use to control versioning for 
code and documentation. It uses **Git** to track changes and allows for multiple 
users to contribute to the same files simultaneously without overwriting each other’s 
work. 

GitHub operates by “cloning” a repository to a location you can access from your local 
machine, allowing you to make changes to the documents in that repository, and then 
uploading those changes to Github again so other users can review and access the edits. 

GitHub is the online system we use, but the computer language used to give commands is 
called “Git”. Git can be used whenever you are operating within a GitHub repository. 

You can find a training for how to use Git and some basic commands in Module 2 within 
the IHME Learn training `Computational Infrastructure Level 1 <https://ihme.brightspace.com/d2l/home/7028>`_. 
We will see an example of how to clone and make edits using Git in the next section. 
It is worth noting that you can use Git and GitHub from BOTH the cluster and from 
terminals on your local computer. 

**How to Access GitHub:** Similar to the cluster, Git commands are written into a 
terminal to access the repositories and push edits. On our team, most PC folks use 
Git Bash which automatically installs with downloading Git. However, some prefer 
the Windows Subsystem for Linux (WSL) for it's user interface and tools. 

For Mac users, the Terminal app which comes installed on your machine can be used for 
Git as well. 

It is worth noting here that these applications can also be used to access the cluster, 
although the common practice on the Sim Science team is to use separate terminals for 
GitHub on our local machine and for cluster access. 

Link to download `Git and Git Bash <https://git-scm.com/>`_
Link to download `WSL <https://learn.microsoft.com/en-us/windows/wsl/install>`_

**Anaconda:** Anaconda aims to simplify package management and deployment for Python 
and R programming. On Sim Science, we use it for updating Vivarium documents. An 
example of this will be in the next section. 

Link to download `Anaconda <https://www.anaconda.com/products/distribution>`_ 

**Text Editors:** For updating Vivarium documents, a text editor is needed. Most of 
the Sim Science team uses Sublime Text. Others on the team prefer Atom, which was 
created by Git and so works well with their system. In addition to these, there are 
**many** other options including: Vim, Notepad++, Visual Studios Code and Gedit. 
If you have a prior favorite text editor, please use that! 

Link to download `Sublime Text <https://www.sublimetext.com/3>`_ 
Link to download `Atom <https://github.blog/2022-06-08-sunsetting-atom/>`_

**Python:** 

Python is the programming language most commonly used by the Sim Science team. 

Link to download `Python <https://www.python.org/downloads/>`_
Please see the below information on versioning for Python. 

**PyCharm:** PyCharm is an environment for running Python code that is designed to 
be user friendly. 

Link to download `PyCharm <https://www.jetbrains.com/pycharm/download/#section=windows>`_ 

**R:** 

R is another programming language that is commonly used at IHME, but less commonly 
used on the Sim Science team. 

Link to download `R and R Studio <https://www.dataquest.io/blog/installing-r-on-your-computer/>`_ 

**R Studio:** R Studio is an environment for running R code that is designed to be user friendly. 

Link to download `R and R Studio <https://www.dataquest.io/blog/installing-r-on-your-computer/>`_ 

**Juptyer:** 

Juptyer is a web-based interactive development environment. That essentially means it’s a place 
to write code and store code that is online and can integrate well with GitHub and the cluster. 
You can code in multiple languages in Juptyer including Python and R. This is more commonly 
used by the Sim Science team than PyCharm. Information on installing and using Juptyer is 
in the Accessing the Cluster section below. 


