const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormRegion extends React.Component {
    constructor(props) {
       super(props)
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      
    }
    componentWillReceiveProps(nextProps) {
        //n
    }

    handleInsert() {
        if(!this.props.id_sucursal_reg){
            this.props.createError('Debe de ingresar una sucursal!');
            return;
        }
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_sucursal: this.props.id_sucursal_reg,
                code: this.props.code,
                name: this.props.name,
                region_manager: this.props.region_manager})
    }).then((response) => {
           this.props.handleReloadRegion();
         }
    );
    }
    
    handleUpdate() {
        if(!this.props.id_sucursal_reg){
            this.props.createError('Debe de ingresar una sucursal!');
            return;
        }
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_region, 
                id_sucursal: this.props.id_sucursal_reg,
                code: this.props.code,
                name: this.props.name,
                region_manager: this.props.region_manager})
     }).then((response) => {
           this.props.handleReloadRegion();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleReloadRegion();
         }
    );
    }

    render() {
        let sucursales = this.props.sucursales;
        let optionItems = sucursales.map((sucursal) => <option key = {sucursal.id}>{sucursal.id}</option>);
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Sucursal:</Label></td>
               <td width="20%">
                    <Input type="select" onChange={this.props.handleFields} name='id_sucursal_reg' value={this.props.id_sucursal_reg}>
                       <option></option>
                        {optionItems}
                    </Input>
               </td></tr>
           <tr><td><Label>Codigo:</Label></td>
               <td><Input type="number" name="code"
                   value={this.props.code} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Nombre:</Label></td>
               <td><Input type="text" name="name"
                   value={this.props.name} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Nombre del Encargado:</Label></td>
               <td><Input type="text" name="region_manager"
                   value={this.props.region_manager} onChange={this.props.handleFields}/></td></tr>
           </tbody></Table><input type="hidden" name="id" value={this.props.id_region}/>
           <Table><tbody><tr>
               <td><Button onClick={this.handleInsert}>Agregar</Button></td>
               <td><Button onClick={this.handleUpdate}>Modificar</Button></td>
               <td><Button onClick={this.handleDelete}>Eliminar</Button></td>
           </tr></tbody></Table></form>)
    }
}