set.seed(4)
library(MASS)
library(ggplot2)
library(reshape2)
library(data.table)

run_paf_testing <- function(n, mean_a, mean_b, sd_a, sd_b, rho, rate, rr_1, rr_2){
  df <- data.frame(id = 1:n)
  df$nml_a = rnorm(n = n, mean_a, sd_a)
  df$nml_b = rnorm(n, mean_b, sd_b)

  # Correlated continuous normal
  sigma <- matrix(c(sd_a^2,rho,rho,sd_b^2), ncol=2)
  cor_nml <- mvrnorm(n= n, mu = c(mean_a, mean_b), Sigma=sigma)

  #cor_nml
  df$cor_a = cor_nml[,1]
  df$cor_b = cor_nml[,2]

  # For this example, I am thinking about HAZ, so I will set 'exposed' to less than -2
  for(l in c("nml_a","nml_b","cor_a","cor_b")){
    y <- ifelse(df[,l] < (-2), 1, 0)
    df[,paste0("exp_",l)] <- y
  }

  # What is the value of the joint risk approach?
  one_over_one_minus_paf = mean(rr_1^df$exp_nml_a * rr_2^df$exp_nml_b)
  paf_j_ind = 1 - 1/(one_over_one_minus_paf)

  ooomp_1 = mean(rr_1^df$exp_nml_a)
  paf_1 = 1 - 1/ooomp_1

  ooomp_2 = mean(rr_2^df$exp_nml_b)
  paf_2 = 1 - 1/ooomp_2

  paf_m_ind = 1 - (1 - paf_1) * (1 - paf_2)

  # What is the value of the joint risk approach?
  one_over_one_minus_paf = mean(rr_1^df$exp_cor_a * rr_2^df$exp_cor_b)
  paf_j_cor = 1 - 1/(one_over_one_minus_paf)

  # how does this compare to multiplicative approx of paf?
  ooomp_1 = mean(rr_1^df$exp_cor_a)
  paf_1 = 1 - 1/ooomp_1

  ooomp_2 = mean(rr_2^df$exp_cor_b)
  paf_2 = 1 - 1/ooomp_2

  paf_m_cor = 1 - (1 - paf_1) * (1 - paf_2)

  # Finally test rates
  # Independent draws
  multi_rate0 = (1-paf_m_ind) * rate
  joint_rate0 = (1-paf_j_ind) * rate
  df$ind_multi_rate = multi_rate0 * rr_1^df$exp_nml_a * rr_2^df$exp_nml_b
  df$ind_joint_rate = joint_rate0 * rr_1^df$exp_nml_a * rr_2^df$exp_nml_b

  # Correlated draws
  multi_rate0 = (1-paf_m_cor) * rate
  joint_rate0 = (1-paf_j_cor) * rate
  df$cor_multi_rate = multi_rate0 * rr_1^df$exp_cor_a * rr_2^df$exp_cor_b
  df$cor_joint_rate = joint_rate0 * rr_1^df$exp_cor_a * rr_2^df$exp_cor_b

  output <- data.frame(rate, rr_1, rr_2, mean_a, mean_b, rho, n, paf_j_cor, paf_m_cor, paf_j_ind, paf_m_ind,
                       ind_multi_rate = mean(df$ind_multi_rate),
                       ind_joint_rate = mean(df$ind_joint_rate),
                       cor_joint_rate = mean(df$cor_joint_rate),
                       cor_multi_rate = mean(df$cor_multi_rate))
  return(output)
}

loop_df <- data.frame()
for(i in seq(0.02, 1, 0.02)){
  p <- run_paf_testing(n=1000, mean_a = (-1), mean_b = mean_b, sd_a = 1.2, sd_b, rate=0.5, rho=i, rr_1 = 2, rr_2 = 4)
  loop_df <- rbind(loop_df, p)
}

ggplot(subset(melt_df, variable %like% "cor_"), aes(x=rho, y=value, col=variable)) + geom_point(size=3) + ylab("Rate") +
  xlab("Covariance") + theme_minimal() + ggtitle("Correlated Exposures") +
  scale_color_manual("Approach", values = c("purple","red"), labels=c("Joint PAF",
                                                                      "Multiplicative PAF"))