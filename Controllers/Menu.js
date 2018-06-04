
const Collapse = Reactstrap.Collapse;
const Navbar = Reactstrap.Navbar;
const NavbarToggler = Reactstrap.NavbarToggler;
const NavbarBrand = Reactstrap.NavbarBrand;
const Nav = Reactstrap.Nav;
const NavItem = Reactstrap. NavItem;
const NavLink = Reactstrap.NavLink;

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  change(event){
    const viewName = event.currentTarget.getAttribute('name');
    this.props.changeView(viewName);
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand name='sucursales' onClick={this.change}>Reporte de Averias</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink name='sucursales' onClick={this.change}>Sucursales</NavLink>
              </NavItem>
              <NavItem>
                <NavLink name='regiones' onClick={this.change}>Regiones</NavLink>
              </NavItem>
              <NavItem>
                <NavLink name='cuadras' onClick={this.change}>Cuadras</NavLink>
              </NavItem>
              <NavItem>
                <NavLink name='suscriptores' onClick={this.change}>Suscriptores</NavLink>
              </NavItem>
              <NavItem>
                <NavLink name='servicios' onClick={this.change}>Servicios</NavLink>
              </NavItem>
              <NavItem>
                <NavLink name='reportes' onClick={this.change}>Reportes</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}