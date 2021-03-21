/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function AdminFooter() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://devpost.com/software/tutrolink?ref_content=my-projects-tab&ref_feature=my_projects" 
            target="_blank">
              Our Project
            </NavLink>
          </NavItem>
        </Nav>
        <div style={{textAlign: "center"}}>
          <a href="/Home.jsx">Return to Homepage</a>
        </div>
        <div className="copyright">
          Made for HackPSU Spring 2021:{" "}
          <i className="tim-icons icon-heart-2" /> {" "}
          <a
            href="https://github.com/MlG-Hackers-HackPSU/HackPSU2021_Tutrolink"
            target="_blank"
          >
            Tutrolink
          </a>{" "}
        </div>
      </Container>
    </footer>
  );
}

export default AdminFooter;