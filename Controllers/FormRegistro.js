const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormRegistro extends React.Component {
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
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'put',
                id_sucursal = this.props.id_sucursal,
                code: this.props.code,
                name: this.props.name,
                region_manager: this.props.region_manager})
    }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }
    
    handleUpdate() {
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_region, 
                id_sucursal = this.props.id_sucursal,
                code: this.props.code,
                name: this.props.name,
                region_manager: this.props.region_manager})
     }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Region/"+this.props.id_region,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }

    render() {
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Sucursal:</Label></td>
               <td width="20%"><Input type="number" name="manager_name"
                   value={this.props.id_sucursal} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Code:</Label></td>
               <td><Input type="number" name="code"
                   value={this.props.code} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Name:</Label></td>
               <td><Input type="text" name="name"
                   value={this.props.name} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Region Manager:</Label></td>
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