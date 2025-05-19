import { Container, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { AppLocationContext } from "../../frame/navigation";

const Layout = ({ children }: { children: ReactNode }) => (
  <AppLocationContext>
    <>
      <CssBaseline />
      <Container sx={{ maxWidth: { xl: 1280 } }}>
        <main id="main-content">{children}</main>
      </Container>
    </>
  </AppLocationContext>
);

export default Layout;
