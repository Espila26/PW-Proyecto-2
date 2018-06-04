const Button = Reactstrap.Button;
const Table = Reactstrap.Table;
const FormGroup = Reactstrap.FormGroup;
const Label = Reactstrap.Label;
const Input = Reactstrap.Input;
const FormText = Reactstrap.FormText;

class FormCuadra extends React.Component {
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
                phone: this.props.phone,
                address: this.props.address,
                id_suscriptor: this.props.cedula})
    }).then((response) => {
           this.props.handleChangeData();
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
                phone: this.props.phone,
                address: this.props.address,
                id_suscriptor: this.props.cedula})
     }).then((response) => {
           this.props.handleChangeData();
         }
    );
    }

    handleDelete() {
        fetch("datos.php/Suscriptor/"+this.props.id_suscriptor,{
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
           <tr><td width="30%"><Label>Name:</Label></td>
               <td width="20%"><Input type="text" name="name"
                   value={this.props.name} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Phone:</Label></td>
               <td><Input type="number" name="phone"
                   value={this.props.phone} onChange={this.props.handleFields}/></td></tr>
           <tr><td><Label>Address:</Label></td>
               <td><Input type="text" name="address"
                   value={this.props.address} onChange={this.props.handleFields}/></td></tr>
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