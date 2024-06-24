resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16" # 10.0.0.0 --> 10.0.255.255 = 256*256 = 65536

  enable_dns_support = true
  enable_dns_hostnames = true
}