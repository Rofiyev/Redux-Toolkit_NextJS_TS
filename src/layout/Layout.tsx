import { Container } from "@chakra-ui/react";
import { ILayout } from "./layout.props";

export default function Layout({ children }: ILayout) {
  return <Container maxW={"1400px"}>{children}</Container>;
}
