.. todo:

   replace the following text with a description of survival analysis 
   concepts. For now this page contains text related to hazard rates as data 
   sources, but needs to be updated.

Hazard Rates
++++++++++++

A "hazard" is a term commonly used in epidemiology survival analysis. For our
purposes, we can think of a hazard rate as an *instantaneous* version of
incidence, remission, or mortality rates as opposed to the annual versions
of these rates that we've previously discussed.

  **Annual rates** tell us how many new cases occur per person-year, or in
  other words, per person over a time *frame* of one year. For instance,

    The annual (hypothetical) incidence of influenza was 0.15 cases per
    person-year.

    The annual (hypothetical) cancer mortality rate was 0.2 cases per
    person-year.

  **Instantaneous (or hazard) rates**, tell us the how many new cases occur at
  a specific *time-point*. For instance,

    The (hypothetical) hazard rate of influenza incidence was 0.001 on July
    1st and 0.3 on December 1st.

    The hazard rate of (hypothetical) cancer mortality is 0.4 in the first
    year after diagnosis, 0.3 in the second year of diagnosis, 0.2 in the
    third year after diagnosis, and so-on.

As illustrated through these examples, the hazard rate allows us to consider
differing incidence rates at different time points relative to a specific
contextualizing event.

In the example of hazard rates for cancer mortality, we see that an individual
is more likely to die from cancer in the first year following diagnosis than
the third year. Importantly, this can be interpreted as an individual who has
lived three years after diagnosis is less likely to die from breast cancer
than an individual who has so far only survived one year after diagnosis.

However, in the example of the annual cancer mortality rate, we have a single
measure which we are forced to assume is constant and uniformly distributed
over the time frame we apply it to. This assumption would suggest that an
individual with breast cancer always has the same probability of breast cancer
mortality following diagnosis, regardless of how much time has passed since
diagnosis. The assumption also suggests that an individual has the same
probability of influenza infection on every day of the year.

**What does this mean for choosing the best cause model data source?**

Depending on the specific cause model at hand, the prefered data source may
vary between annual incidence rates and instantaneous incidence (or hazard)
rates. The table below discusses some considerations that may influence
which data source is preferable. In general...

**Annual rates are preferable when:**

- The assumption of uniform and constant distribution of new cases is **valid**

      or

- The assumption of uniform and constant distribution of new cases is
  **invalid**, but there is insufficient data to utilize an instantaneous
  hazard rate (note this as a model limitation and consider other ways to
  address it)

      or

- The assumption of uniform and constant distribution of new cases is
  **invalid**, but the assumption will not impact model results in a
  meaningful way

**Instantaneous (hazard) rates are preferable when:**

- There is not a uniform or constant distribution of new cases over an
  annual time-frame

      and

- There is sufficient data to inform incidence on a time-frame more specific
  than annual

      and

- Using a hazard rate adds value to the model
