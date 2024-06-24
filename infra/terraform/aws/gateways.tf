# for public routes
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id
}

# for private routes
# the nat's public ip is in az1 so if az1 goes down 
# the nat goes down as well --> need redundency
resource "aws_nat_gateway" "nat_gateway_az1" {
  subnet_id = aws_subnet.public_az1.id
  allocation_id = aws_eip.eip1.id
  depends_on = [ aws_eip.eip1 ]
}

resource "aws_nat_gateway" "nat_gateway_az2" {
  subnet_id = aws_subnet.public_az2.id
  allocation_id = aws_eip.eip2.id
  depends_on = [ aws_eip.eip2 ]
}

# static public ip address
resource "aws_eip" "eip1" {
  domain = "vpc"
  depends_on = [ aws_internet_gateway.internet_gateway ]
  # might need to fix the address myself in the proper subnet
}

resource "aws_eip" "eip2" {
  domain = "vpc"
  depends_on = [ aws_internet_gateway.internet_gateway ]
}