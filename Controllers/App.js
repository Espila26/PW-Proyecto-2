const Table = Reactstrap.Table;
const Progress = Reactstrap.Progress;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={logged:false,loading:true,userName:'',password:'', 
        sucursales:[], id_sucursal:0, manager_name:'', phone:0, city:'', address:'',
        regiones: [], id_region:0, id_sucursal_reg:0, code:'', name: '', region_manager: '',
        cuadras:[], id_cuadra:0, id_region_cuadra:0, code_cuadra:'', description:'',
        reportes: [],id_reporte:0, id_suscriptor_rep:0, id_servicio_rep:0, date:'', type:'', description_rep:'',
        suscriptores:[], id_suscriptor:0, name:'', phone_susc:0, address_susc:'', cedula: '', 
        servicios:[], id_servicio:0, id_suscriptor_servicio:0, location:'', code_serv:'', type_serv:'', instalation_date: '', other_services: '', state_serv:'', housing_type:'',  floor_number:0, external_hub_number:'', cable_number:'',instalation_belongs_to_suscriptor: '', tvs_number:'',
        currentPage: 'login'};
        this.handleFields = this.handleFields.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeDataRegion = this.handleChangeDataRegion.bind(this);
        this.handleChangeDataCuadra = this.handleChangeDataCuadra.bind(this);
        this.handleChangeDataReporte = this.handleChangeDataReporte.bind(this);
        this.handleChangeDataServicio = this.handleChangeDataServicio.bind(this);
        this.handleChangeDataSuscriptores = this.handleChangeDataServicio.bind(this);
        this.handleReloadSucursal = this.handleReloadSucursal.bind(this);
        this.handleReloadRegion = this.handleReloadRegion.bind(this);
        this.handleReloadCuadra = this.handleReloadCuadra.bind(this); 
        this.handleReloadReporte = this.handleReloadReporte.bind(this);
        this.handleReloadServicio = this.handleReloadServicio.bind(this); 
        this.handleReloadSuscriptores = this.handleReloadSuscriptores.bind(this);
        this.handleChangeSucursal = this.handleChangeSucursal.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangeCuadra = this.handleChangeCuadra.bind(this);
        this.changeView = this.changeView.bind(this); 
        this.login = this.login.bind(this);
    }

    handleFields(event) {
      const propiedad = event.currentTarget.getAttribute('name');
      this.setState({[propiedad]: event.target.value});
    }

    handleChangeData() {
      this.handleChangeSucursal();
    }

    handleChangeDataRegion(){
      this.handleReloadRegion();
    }

    handleChangeDataCuadra(){
      this.handleReloadCuadra();
    }

    handleChangeDataReporte(){
      this.handleReloadReporte();
    }

    handleChangeDataServicio(){
      this.handleReloadServicio();
    }

    handleChangeDataSuscriptores(){
      this.handleReloadSuscriptores();
    }

    componentWillMount() {
      this.handleReloadSucursal();
      this.handleReloadRegion();
      this.handleReloadCuadra();
      this.handleReloadServicio();
      this.handleReloadReporte();
      this.handleChangeDataSuscriptores();
    }

    handleReloadSucursal(){
      fetch('datos.php/Sucursal')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ sucursales: data, loading:false });
           // alert(JSON.stringify(data));
            this.forceUpdate();
        })
    }
    
    handleReloadRegion(){
      fetch('datos.php/Region')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ regiones: data});
            this.forceUpdate();
        })
    }

    handleReloadCuadra(){
      fetch('datos.php/Cuadras')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ cuadras: data});
            this.forceUpdate();
        })
    }

    handleReloadReporte(){
      fetch('datos.php/Reporte')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ reportes: data});
            this.forceUpdate();
        })
    }

    handleReloadServicio(){
      fetch('datos.php/Servicio')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ servicios: data});
            this.forceUpdate();
        })
    }

    handleReloadSuscriptores(){
      fetch('datos.php/Suscriptor')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ suscriptores: data});
            this.forceUpdate();
        })
    }

    handleChangeSucursal(sucursal){
      this.setState({id_sucursal: sucursal.id, manager_name: sucursal.manager_name, phone: sucursal.phone, city: sucursal.city, address:sucursal.address});
    }

    handleChangeRegion(region){
      this.setState({id_region: region.id, id_sucursal_reg: region.id_sucursal, code: region.code, name: region.name, region_manager:region.region_manager});
    }

    handleChangeCuadra(cuadra){
      this.setState({id_cuadra: cuadra.id, id_region_cuadra: cuadra.id_region, code: region.code_cuadra, description:cuadra.description});
    }

    handleChangeServicio(servicio){
      this.setState({id_servicio: servicio.id, id_suscriptor_servicio: servicio.id_suscriptor, location: servicio.location, code:servicio.code_serv, type:servicio.type_serv, 
      instalation_date:servicio.instalation_date, other_services:services.other_services, state: services.state_serv, housing_type:services.housing_type,
      floor_number:servicio.floor_number, external_hub_number:services.external_hub_number, cable_number: services.cable_number,
      instalation_belongs_to_suscriptor: servicio.instalation_belongs_to_suscriptor, tvs_number: services.tvs_number});
    }

    handleChangeReporte(reporte){
      this.setState({id_reporte: reporte.id, id_suscriptor_rep: reporte.id_suscriptor, id_servicio_rep: reporte.id_region, date:reporte.date, type: reporte.type, description_rep: reporte.description_rep, state: reporte.state});
    }

    handleChangeSuscriptor(suscriptor){
      this.setState({id_suscriptor: suscriptor.id, name: suscriptor.name, phone: suscriptor.phone_susc, address:suscriptor.address_susc, id_suscriptor: suscriptor.cedula});
    }

    changeView(view){
      this.setState({currentPage: view});
    }
    login(logged){
      this.setState({logged:logged});
    }

    render() {
        return (
          <div>
            { (this.state.loading) && <Progress animated value={100} />
              
              || (!this.state.loading) && (!this.state.logged) && (this.state.currentPage==='login') &&
              <Login handleFields={this.handleFields} userName={this.state.userName} password={this.state.password} changeView={this.changeView} login={this.login}/>

              || (!this.state.loading) && (!this.state.logged) && (this.state.currentPage==='signIn') &&
              <SignIn handleFields={this.handleFields} userName={this.state.userName} password={this.state.password} changeView={this.changeView} login={this.login}/>

              || (!this.state.loading) && (this.state.logged) && 
              <div>
                <Menu currentPage={this.state.currentPage} changeView={this.changeView}/> 
                {((this.state.currentPage==='sucursales') &&
                  <div><Table><tr width="100%">
                  <td width="50%"><FormRegion handleFields={this.handleFields} id_region={this.state.id_region} 
                  id_sucursal_reg={this.state.id_sucursal_reg} code={this.state.code} name ={this.state.name} region_manager={this.state.region_manager}  
                  regiones={this.state.regiones} sucursales={this.state.sucursales} handleChangeDataRegion =  {this.handleChangeDataRegion}/></td>
                  <td width="50%"><ListaRegion regiones={this.state.regiones} handleChangeDataRegion =  {this.handleChangeDataRegion} handleChangeRegion = {this.handleChangeRegion}/></td>  
                  </tr></Table></div> 
                )

                ||((this.state.currentPage==='regiones') &&
                <div><Table><tr width="100%">
                    <td width="50%"><FormSucursal handleFields={this.handleFields} id_sucursal={this.state.id_sucursal} 
                    manager_name={this.state.manager_name} phone={this.state.phone} city={this.state.city} address={this.state.address} 
                    sucursales={this.state.sucursales} handleChangeData =  {this.handleChangeData}/></td>
                <td width="50%"><ListaSucursal sucursales={this.state.sucursales} handleChangeData =  {this.handleChangeData} handleChangeSucursal = {this.handleChangeSucursal}/></td>
                </tr></Table></div> 
              )
              }
            </div>
            }
        </div>
      )
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));
