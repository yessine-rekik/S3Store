resource "aws_subnet" "private_az1" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.0.0/19" # 10.0.0.0 --> 10.0.31.255 = 256*32 = 8192
  availability_zone = local.az1

  # https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html
  tags = {
    "Name"                            = "$private-${local.az1}"
    "kubernetes.io/role/internal-elb" = "1"
    # "kubernetes.io/cluster/${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_az1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.32.0/19"
  availability_zone       = local.az1
  map_public_ip_on_launch = true

  tags = {
    "Name"                   = "$public-${local.az1}"
    "kubernetes.io/role/elb" = "1"
    # "kubernetes.io/cluster/${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "private_az2" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.64.0/19"
  availability_zone = local.az2

  tags = {
    "Name"                            = "$private-${local.az2}"
    "kubernetes.io/role/internal-elb" = "1"
    # "kubernetes.io/cluster/${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_az2" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.96.0/19"
  availability_zone       = local.az2
  map_public_ip_on_launch = true

  tags = {
    "Name"                   = "$public-${local.az2}"
    "kubernetes.io/role/elb" = "1"
    # "kubernetes.io/cluster/${local.eks_name}" = "owned"
  }
}
