.. _2017_risk_correlation_ldlc_fpg_ikf_sbp:

-----------------------
Risk Factor Correlation
-----------------------

Risk Factor Correlation Overview
--------------------------------

Let X and Y be random variables with marginal densities f\ :sub:`x` and  g\ :sub:`y`, and with joint density h\ :sub:`xy`.  The corresponding CDFs are denoted by capital letters: F\ :sub:`X`, G\ :sub:`Y` and  H\ :sub:`XY`.  Although I am using terminology consistent with continuous random variables, I am sloppy herein concerning whether X and Y are in fact discrete or continuous (e.g. see assumption that the inverse CDF exists…).

Define the matrix of correlation parameters between random variables to be :math:`\theta`, such that, in two variable case:

.. todo::
  Add correct matrix

.. math::
   \theta = \begin{bmatrix}
                  1    & \rho \\
                  \rho & 1    \\
            \end{bmatrix}

Description of general approach
-------------------------------

We are starting with two correlated random variables.  Using a variety of transformations, we can express these random variables in terms of independent standard normal variables.  (See literature on dependence measures, such as Pearson’s rho, Spearman’s rho and Kendall’s tau, as well as literature on Nataf transformation, Rosenblatt transformation, a ton of literature on “copulas”, including Archimedean, Gaussian, Clayton and elliptical varieties.)  Some background is provided here, but the scope is severely limited compared to the available literature on the subject.

Background
----------

A copula is a multivariate distribution function whose marginal distributions are uniform on the interval [0,1].  There are many different copulas, all satisfying the following:  if the random variables have marginal distributions, then there exists an n-dimensional copula C such that 

:math:`F_{X_{1},\ldots,X_{n}}\left( x_{1},\ldots,x_{n} \right) = C\left\lbrack F_{X_{1}}\left( x_{1} \right),\ldots,F_{X_{n}}(x_{n}) \right\rbrack`

Knowing that the relationship between the random variables in not often linear, Pearson’s rho is not an appropriate metric.  Instead, metrics such as Spearman’s rho or Kendall’s tau, which measure correlation in terms of rank, are a better choice.  Rank correlation is called concordance, and is defined as follows for random variables X and Y:  if large values of X are associated with large values of Y, X and Y are concordant (as opposed to being discordant).  A concordance function, Q, gives the difference between the probability of concordance and the probability of discordance for an independent pair of vectors (X\ :sub:`1`,Y\ :sub:`1` )  and (X\ :sub:`2`,Y\ :sub:`2` ) of random variables:

:math:`Q = P\left\lbrack \left( X_{1} - X_{2} \right)\left( \left( Y_{1} - Y_{2} \right) > 0 \right) \right\rbrack - P\left\lbrack \left( X_{1} - X_{2} \right)\left( \left( Y_{1} - Y_{2} \right) < 0 \right) \right\rbrack`

Note that the vectors are independent of each other, but the random variables which make up the vectors are correlated.  Specifically, they have the following joint distributions:

:math:`H_{1}\left( x,y \right) = C_{1}\left( F\left( x \right),G\left( y \right) \right)\ \text{and}\ H_{2}\left( x,y \right) = C_{2}\left( F\left( x \right),G\left( y \right) \right)`

This can be expressed as copulas:

:math:`\ Q = Q\left( C_{1},C_{2} \right) = 4\iint_{}^{}{C_{2}\left( F\left( x \right),G\left( y \right) \right)\text{dC}_{1}\left( F\left( x \right),G\left( y \right) \right) - 1}`

**Spearman’s rho** is proportional to the probability of concordance minus the probability of discordance between two random vectors (X\ :sub:`1`,Y\ :sub:`1` )  and (X\ :sub:`2`,Y\ :sub:`2` ) with the same marginal distributions F(x) and G(y), but with difference copulas:

:math:`H_{1}\left( x,y \right) = C_{1}\left( F\left( x \right),G\left( y \right) \right)\ \text{for}\ \left( X_{1},Y_{1} \right)`

and

:math:`H_{2}\left( x,y \right) = C_{2}\left( x,y \right) = F\left( x \right)G\left( y \right)\ \text{for}\ \left( X_{2},Y_{2} \right)`

The population version of Spearman’s rho is defined as

:math:`\rho_{s} = 3P\left\lbrack \left( X_{1} - X_{2} \right)\left( \left( Y_{1} - Y_{2} \right) > 0 \right) \right\rbrack - P\left\lbrack \left( X_{1} - X_{2} \right)\left( \left( Y_{1} - Y_{2} \right) < 0 \right) \right\rbrack`

where multiplication by 3 normalizes Spearman’s rho to be on the interval [-1,1].  A result of the definition of copula H\ :sub:`2` is that Spearman’s rho, when written in terms of the integration of copulas,

:math:`\rho_{s} = 3Q\left( C_{1},C_{2} \right) = 12\iint_{}^{}{F\left( x \right)G\left( y \right)\text{dC}_{1}\left( F\left( x \right),G\left( y \right) \right) - 3}`

simplifies to the following:

:math:`\rho_{s} = 12\iint_{}^{}{C_{1}\left( F\left( x \right),G\left( y \right) \right)\text{dF}\left( x \right)dG(y) - 3}`

For certain copulas (Frank, Farlie-Cumbel-Morgenstern, and Gaussian), Spearman’s rho can be expressed as a simple function of the correlation parameter, :math:`\rho`\ :sub:`s` = k(:math:`\theta`), where :math:`\theta` is the linear correlation between the two random variables.  

**Kendall’s tau** is the probability of concordance minus the probability of discordance between two random vectors (X\ :sub:`1`,Y\ :sub:`1` )  and (X\ :sub:`2`,Y\ :sub:`2`) with the same marginal distributions F(x) and G(y), and with a common copula:

:math:`H\left( x,y \right) = C\left( F\left( x \right),G\left( y \right) \right)\ \text{for}\ \left( X_{1},Y_{1} \right)\ \text{and}\ \left( X_{2},Y_{2} \right)`

The population version of Kendall’s tau is defined as

:math:`\tau = Q\left( C,C \right) = 4\iint_{}^{}{C(F\left( x \right),G\left( y \right))dC\left( F\left( x \right),G\left( y \right) \right) - 1}`

Kendall’s tau can be expressed as a function of the correlation parameter for a broader set of copulas than Spearman’s rho.

A Gaussian copula is a multivariate normal distribution of standard normal variables:

:math:`C\left( x_{1},\ldots,x_{n} \right) = \Phi\left\lbrack \Phi^{- 1}\left( x_{1} \right),\ldots{,\Phi}^{- 1}\left( x_{n} \right) \right\rbrack`

and is used in the Nataf transformation to transform the original variables **X** into correlated standard normal variables **Y** with Φ(**0,P'**) where **P’** is the reduced covariance matrix.

Spearman’s rho with a Gaussian copula can be expressed as follows:

:math:`\rho_{s} = k\left( \theta \right) = \frac{6}{\pi}\operatorname{}\left( \frac{\theta}{2} \right)`

Application
-----------

This process takes several steps.  The ultimate goal is to generate risk-correlated distributions from which simulants will be initialized.  I calculated Spearman’s rho using data from NHANES 2011.  The steps below assume these are normally distributed, but it would probably be wise to try to find the “true” function form from a literature review.  The first step is simply to create inverse CDFs from GBD data.  Since the GBD distributions are empirical, the inverse CDF exists.  It will be a step function, but this shouldn’t be problematic.  Step 2 generates a random variable for each risk factor and simultaneously builds in the correlation.  Next, transform the underlying GBD distribution into a uniform distribution on [0,1] by way of the Gaussian copula.  Finally, use the inverse CDFs to transform these correlated random variables into correlated marginal distributions.  Sample from these for initialization data.

1. Compute the CDF for each GBD risk factor distribution and find each inverse CDF.  Call this GBD_i^(-1) where the subscript denotes the risk factor.

2. Define Z_i to be a random variable, where i = the number of risk factors.  Generate random values for each 〖(Z〗_i 〖,Z〗_j) pair to be drawn from a bivariate normal distribution with (Spearman’s) correlation matrix **ρ_s**.  
	
3. Define U_i=Φ_Z (Z_i) which is the CDF of each Z_i.  Since we sampled values for Z_i, this can be computed (may be a step function – smoothing might be too fancy).

4. Generate X_i= GBD_i^(-1) (U_i) for each risk factor. These will have the same distributions s their counterparts in GBD, and they will have appropriate correlation thanks to step #2.
	
5. Sample from each X_i distribution to initialize the simulation population.

If I’m not mistaken, this approach should work for categorical risk factors as well.  The inverse CDF from the GBD data for the categorical risks will be very much a step function, but I’m not sure that matters – since I can’t see where it would crash this recipe.  As long as the inverse CDF is well defined, I think this should work. 

Step #2 could be generalized, I think, so that values are drawn not pairwise, but from a generic multivariate with dimension = the number of risk factors.  I started writing this with the idea that values would need to be sampled from different distributions (not always normal), but the more time I spend on this, the more I convince myself that we only need the normal distribution, regardless of the risk factor and “true” underlying distribution.  (I hope I’m not overlooking negative values here…)  I also computed rho values pairwise and I don’t want to take time to calculate the 4x4 matrix again.

The biggest weakness is obviously use of the Gaussian copula, which could be generalized with some additional time and effort.  I know selection of the copula can make a reasonably significant difference (depending on the shape of the scatter plot), but time constraints are binding here, so it’s saved for future work.

Spearman correlations between LDL-c, SBP, FPG, GFR

.. csv-table:: Spearman correlations between LDL-c, SBP, FPG, GFR
   :file: spearman_correlations.csv
   :widths: 20, 10, 10, 10, 10, 10
   :header-rows: 1

PAF adjustment
--------------

With the correlated risk distributions in hand, we can make an adjustment to the GBD PAF calculation.  Let 〖PAF〗_joint be the population attributable fraction which incorporates the correlated risks, such that

PAF\ :sub:`joint` = 1 - :math:`[{\int_{FPG}^{} \int_{IKF}^{} \int_{SBP}^{} \rho_{e_{FPG,IKF,SBP,LDL}} \times\ \prod_{i= \epsilon [LDL,SBP,IKF,FPG]} RR_i^{e_i} de_i}]^{-1}`

If I’m not mistaken, this approach should work for categorical risk factors as well.  The inverse CDF from the GBD data for the categorical risks will be very much a step function, but I’m not sure that matters – since I can’t see where it would crash this recipe.  As long as the inverse CDF is well defined, I think this should work. 
Step #2 could be generalized, I think, so that values are drawn not pairwise, but from a generic multivariate with dimension = the number of risk factors.  I started writing this with the idea that values would need to be sampled from different distributions (not always normal), but the more time I spend on this, the more I convince myself that we only need the normal distribution, regardless of the risk factor and “true” underlying distribution.  (I hope I’m not overlooking negative values here…)  
The biggest weakness is obviously use of the Gaussian copula, which could be generalized with some additional time and effort.  I know selection of the copula can make a reasonably significant difference (depending on the shape of the scatter plot), but time constraints are binding here, so it’s saved for future work.

