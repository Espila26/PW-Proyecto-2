const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormSuscriptores extends React.Component {
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
        fetch("datos.php/Suscriptor/"+this.props.id_suscriptor,{
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'put',
                name: this.props.name,
                phone: this.props.phone_susc,
                address: this.props.address_susc,
                id_suscriptor: this.props.cedula})
    }).then((response) => {
           this.props.handleChangeDataSuscriptores();
         }
    );
    }
    
    handleUpdate() {
        fetch("datos.php/Suscriptor/"+this.props.id_suscriptor,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.id_suscriptor, 
                name: this.props.name,
                phone: this.props.phone_susc,
                address: this.props.address_susc,
                id_suscriptor: this.props.cedula})
     }).then((response) => {
           this.props.handleChangeDataSuscriptores();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Suscriptor/"+this.props.id_suscriptor,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
           this.props.handleChangeDataSuscriptores();
         }
    );
    }

    render() {
        return(<form><Table><tbody>
           <tr><td width="30%"><Label>Nombre:</Label></td>
               <td width="20%"><Input type="text" name="name"
                   value={this.props.name} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Telefono:</Label></td>
               <td><Input type="number" name="phone_susc"
                   value={this.props.phone_susc} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Direccion:</Label></td>
               <td><Input type="text" name="address_susc"
                   value={this.props.address_susc} onChange={this.props.handleFields}/></td></tr>
            <tr><td><Label>Cedula:</Label></td>
               <td><Input type="text" name="cedula"
                   value={this.props.cedula} onChange={this.props.handleFields}/></td></tr>
           </tbody></Table><input type="hidden" name="id" value={this.props.id_suscriptor}/>
           <Table><tbody><tr>
               <td><Button onClick={this.handleInsert}>Agregar</Button></td>
               <td><Button onClick={this.handleUpdate}>Modificar</Button></td>
               <td><Button onClick={this.handleDelete}>Eliminar</Button></td>
           </tr></tbody></Table></form>)
    }
}