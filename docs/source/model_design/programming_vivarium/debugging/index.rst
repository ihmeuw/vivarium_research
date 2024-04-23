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

.. _debugging_rt:

===============
Basic Debugging
===============

.. contents::
   :local:
   :depth: 2

Debugging is an art and science that we couldn't hope to cover on this 
single page. Rather than attempt such foolishness, we we review a few simple 
techniques in the context of a targeted example here. If you find the 
bug to be outside the scope of this page, it's likely time to ask an 
engineer for help.  

Making Sense of the Stack Trace
-------------------------------

The stack trace is an output that the model provides to show what 
error message was received and trace back the flow of code to what 
caused the error. Often the immediate line of code that generated the error will be 
significantly removed from the line of code that will need to be changed 
to fix the error. 

Let's work through an example to understand this. Say a line of code 
we edit in the :code:`loader.py` file filters a dataset incorrectly 
such that it is actually empty. Nothing in that immediate block of 
code catches this error - instead the provided dataframe is just 
stored as empty. 

From there this same, empty dataset is used in another :code:`loader.py` 
function to calculate a rate. So our erroreously empty dataframe will be 
multiplied by a dataframe with the correct data in it. 
When pandas tries to by this multiplication on the dataframes, 
it will find that the lengths do not match when they should. Pandas has 
functions that run through a series of checks and if one fails, throws an 
error message. 

So the bottom line of the stack trace will likely say an error was thrown 
in a pandas error message function that the lengths are not equal. From there, 
the stack trace displays the code that lead here - for example the pandas 
checking function that was run, then the pandas function that was called 
(the multiplication), then the secondary 
:code:`loader.py` function that tried to multiply with the empty dataframe. And still, 
none of these will actually reveal the issue with filtering the dataset 
we started with! This can be further complicated if the :code:`loader.py` function 
using some functions for other packages, like :code:`vivarium_research` or :code:`vivarium_public_health`. 

As you can see from this example, the stack trace can be both helpful and unhelpful. 
In general, look through the files to see if you can get back to something 
you wrote or edited - like the :code:`loader.py` file. If so, this is a good 
place to start looking for issues, and the stack trace will provide the line 
number of the code that caused the error. 

Otherwise, see the next section for how to use the python debugger. 

Navigating the Python Debugger
------------------------------

In all of the commands used to run engineering commands, the 
flag :code:`--pbd` is used, which means that when an error 
occurs, you will be placed into the python debugger. 

The python debugger is nice to use in tandem with the stack trace. 
Let's continue with the example above, where we got an error 
in a pandas checking function. 

The python debugger places you at the end of the stack trace - 
so we are currently sitting in a pandas error message function. 
We can check this by typing :code:`l.` or :code:`ll` which prints 
the code around the current line (l.), or a longer version of this 
print out (ll). This will let you see what the code surrounding the 
error is. Likely in this case, it will just show you that pandas found 
mismatched lengths and threw the error message, which isn't too helpful. 

Next, you can move up or down the stack trace with :code:`u` or 
:code:`d` respectively. Since we start at the bottom of the stack 
trace, we will move up first. By entering :code:`u`, we move to the 
pandas checking function, then the pandas multiplication function, and finally 
to the line in our :code:`loader.py` function. 

Note: it can 
often take several times entering :code:`u` to get to a useful 
point in the code. Don't be surprised if you need to move up a lot!

Now in the debugger, we are "located" in the :code:`loader.py` function 
that started this error. Since the debugger is "in" this line of code, 
the objects at that point in the code are able to be called. For example, 
we can print or manipulate the dataframes being worked with. The code 
for this in the python debugger is the same as used in 
a Jupyter notebook. By printing the dataframes being used, you 
might discover that one of the dataframes is empty - and the 
issue is more clear! 

From there, we can look at the code generating the empty dataframe. 
Maybe you see the error quickly. But if not, we'll probably 
want to add a breakpoint. 

To quit the python debugger, enter :code:`quit`. 

Adding Breakpoints
------------------

So, we have identified the issue is an empty dataframe. Let's keep 
debugging! The datframe in question is generated 
in a function not in our stack trace. This means we'll have trouble 
getting to it with the python debugger. We'll need to set a breakpoint. 

A breakpoint is a line of code :code:`breakpoint()` that "breaks" 
the code. So when this line is read, the model will drop you into a 
python debugger at that point in the code. So in our example, we might 
set a breakpoint in the function which creates the empty dataframe. 

Once in the python debugger, we can use a similar process to the above. 
Start by printing the dataframe. If it's empty, the issue is earlier 
in the code. If the dataframe is still correct, the issue is later. 
Either use up or step (:code:`s`) to move up or "step" down to the next 
line. In this manner, you can navigate around the code in the debugger and 
find which line is the issue. From there, you can investigate the line 
and fix the bug. 

If you need to use multiple breakpoints, you can also use the 
command :code:`c` for continue, to move until the next breakpoint. 

Using iPython
-------------

iPython is less commonly used for the type of debugging outlined 
above. Instead, it is helpful for doing some basic checks on 
outputs, or manipulation of outputs without opening a Jupyter 
notebook. 

First, you'll need to install iPython in your environment with 
:code:`pip install iPython`. Then start an iPython session by 
typing :code:`iPython` in the command line. 

From here, you can use this the same as a Jupyter notebook, except 
code can't be stored and you must enter and run lines one at a time. Some effects 
of this are, for example, you have to run all :code:`import` lines every 
time you start an iPython session, and you can't store custom 
functions to use repeatedly easily. However, there are some use cases. 

For example, if you want to print out an artifact key to check the 
columns included. Jupyter notebook can do this, but you will need 
to open a notebook, connect online, create a file, print the file, 
and at the end of that, you'll need to end the Jupyter session before you 
can run anything else from the open terminal. This is a lot of work to visualize 
one dataframe! iPython can be run in the 
terminal without creating unneeded files or worrying about connections. 

Therefore, while iPython is "worse" than Jupyter notebooks overall (in this 
author's opinion), it is faster and therefore useful for quick tasks. 
Common uses include: printing out dataframes saved elsewhere; simple 
tests for an input data file on the index, length, etc.; removing 
a key from the artifact so it can be replaced, or any other quick checks and 
changes of this nature.

Continued Learning
------------------

Debugging is a very complex skill. Should you wish to continue your 
learning more generally, here are some resources: 

#. Docs for the python debugger with additional commands: https://docs.python.org/3/library/pdb.html 
#. A software carpentry module on testing and debugging: https://paris-swc.github.io/python-testing-debugging-profiling/index.html 

