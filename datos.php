<?php
    require("Toro.php");
    class Sucursal{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Sucursales WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Sucursales");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $managerName = $_PUT['manager_name'];
                $phone = $_PUT['phone'];
                $city = $_PUT['city'];
                $address = $_PUT['address'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Sucursales (manager_name,phone,city,address)
                                                VALUES (:manager_name,:phone,:city,:address)");
                $stmt->bindParam(':manager_name', $managerName);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':city', $city);
                $stmt->bindParam(':address', $address);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Sucursales WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                $id = $_POST['id'];
                $managerName = $_POST['manager_name'];
                $phone = $_POST['phone'];
                $city = $_POST['city'];
                $address = $_POST['address'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Sucursales SET manager_name=:manager_name,
                                        phone=:phone, city=:city,
                                        address=:address WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':manager_name', $managerName);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':city', $city);
                $stmt->bindParam(':address', $address);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class Region{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Regiones WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Regiones");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $idSucursal = $_PUT['id_sucursal'];
                $code = $_PUT['code'];
                $name = $_PUT['name'];
                $regionManager = $_PUT['region_manager'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Regiones (id_sucursal,code,name,region_manager)
                                                VALUES (:id_sucursal,:code,:name,:region_manager)");
                $stmt->bindParam(':id_sucursal', $idSucursal);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':region_manager', $regionManager);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Regiones WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function deleteBySucursal($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Regiones WHERE id_sucursal = :id_sucursal");
                $stmt->bindParam(':id_sucursal', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='deleteBySucursal')
                    return $this->delete($id);
                $id = $_POST['id'];
                $idSucursal = $_POST['id_sucursal'];
                $code = $_POST['code'];
                $name = $_POST['name'];
                $regionManager = $_POST['region_manager'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Regiones SET id_sucursal=:id_sucursal,
                                        code=:code, name=:name,
                                        region_manager=:region_manager WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':id_sucursal', $idSucursal);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':region_manager', $regionManager);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class Cuadra{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Cuadras WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Cuadras");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $idRegion = $_PUT['id_region'];
                $code = $_PUT['code'];
                $description = $_PUT['description'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Cuadras (id_region,code,description)
                                                VALUES (:id_region,:code,:description)");
                $stmt->bindParam(':id_region', $idRegion);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':description', $description);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Cuadras WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function deleteByRegion($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Cuadras WHERE id_region = :id_region");
                $stmt->bindParam(':id_region', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='deleteByRegion')
                    return $this->delete($id);
                $id = $_POST['id'];
                $idRegion = $_POST['id_region'];
                $code = $_POST['code'];
                $description = $_POST['description'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Cuadras SET id_region=:id_region,
                                        code=:code, description=:description
                                         WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':id_region', $idRegion);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':description', $description);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class Suscriptor{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Suscriptores WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Suscriptores");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $name = $_PUT['name'];
                $phone = $_PUT['phone'];
                $address = $_PUT['address'];
                $idSuscriptor = $_PUT['id_suscriptor'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Suscriptores (name,phone,address,id_suscriptor)
                                                VALUES (:name,:phone,:address,:id_suscriptor)");
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':address', $address);
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Suscriptores WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                $id = $_POST['id'];
                $name = $_POST['name'];
                $phone = $_POST['phone'];
                $address = $_POST['address'];
                $idSuscriptor = $_POST['id_suscriptor'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Suscriptores SET name=:name,
                                        phone=:phone, address=:address, 
                                        id_suscriptor=:id_suscriptor WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':address', $address);
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class Servicio{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Servicios WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Servicios");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $idSuscriptor = $_PUT['id_suscriptor'];
                $location = $_PUT['location'];
                $code = $_PUT['code'];
                $type = $_PUT['type'];
                $instalationDate = $_PUT['instalation_date'];
                $otherServices = $_PUT['other_services'];
                $state = $_PUT['state'];
                $housingType = $_PUT['housing_type'];
                $floorNumber = $_PUT['floor_number'];
                $externalHubNumber = $_PUT['external_hub_number'];
                $cableMeters = $_PUT['cable_meters'];
                $instalationBelongsSuscriptor = $_PUT['instalation_belongs_to_suscriptor'];
                $tvsNumber = $_PUT['tvs_number'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Servicios (id_suscriptor,location,code,type,instalation_date,
                                                              other_services,state,housing_type,floor_number,
                                                              external_hub_number,cable_meters,instalation_belongs_to_suscriptor,
                                                              tvs_number)
                                                VALUES (:id_suscriptor,:location,:code,:type,:instalation_date,
                                                        :other_services,:state,:housing_type,:floor_number,
                                                        :external_hub_number,:cable_meters,:instalation_belongs_to_suscriptor,
                                                        :tvs_number)");
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);
                $stmt->bindParam(':location', $location);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':type', $type);
                $stmt->bindParam(':instalation_date', $instalationDate);
                $stmt->bindParam(':other_services', $otherServices);
                $stmt->bindParam(':state', $state);
                $stmt->bindParam(':housing_type', $housingType);
                $stmt->bindParam(':floor_number', $floorNumber);
                $stmt->bindParam(':external_hub_number', $externalHubNumber);
                $stmt->bindParam(':cable_meters', $cableMeters);
                $stmt->bindParam(':instalation_belongs_to_suscriptor', $instalationBelongsSuscriptor);
                $stmt->bindParam(':tvs_number', $tvsNumber);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Servicios WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function deleteBySuscriptor($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Servicios WHERE id_suscriptor = :id_suscriptor");
                $stmt->bindParam(':id_suscriptor', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='deleteBySuscriptor')
                    return $this->deleteBySuscriptor($id);
                $id = $_POST['id'];
                $idSuscriptor = $_POST['id_suscriptor'];
                $location = $_POST['location'];
                $code = $_POST['code'];
                $type = $_POST['type'];
                $instalationDate = $_POST['instalation_date'];
                $otherServices = $_POST['other_services'];
                $state = $_POST['state'];
                $housingType = $_POST['housing_type'];
                $floorNumber = $_POST['floor_number'];
                $externalHubNumber = $_POST['external_hub_number'];
                $cableMeters = $_POST['cable_meters'];
                $instalationBelongsSuscriptor = $_POST['instalation_belongs_to_suscriptor'];
                $tvsNumber = $_POST['tvs_number'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Servicios SET id_suscriptor=:id_suscriptor, location=:location,
                                        code=:code, type=:type, instalation_date=:instalation_date,
                                        other_services=:other_services, state=:state, housing_type=:housing_type,
                                        floor_number=:floor_number, external_hub_number=:external_hub_number,
                                        cable_meters=:cable_meters, instalation_belongs_to_suscriptor=:instalation_belongs_to_suscriptor,
                                        tvs_number=:tvs_number
                                         WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);
                $stmt->bindParam(':location', $location);
                $stmt->bindParam(':code', $code);
                $stmt->bindParam(':type', $type);
                $stmt->bindParam(':instalation_date', $instalationDate);
                $stmt->bindParam(':other_services', $otherServices);
                $stmt->bindParam(':state', $state);
                $stmt->bindParam(':housing_type', $housingType);
                $stmt->bindParam(':floor_number', $floorNumber);
                $stmt->bindParam(':external_hub_number', $externalHubNumber);
                $stmt->bindParam(':cable_meters', $cableMeters);
                $stmt->bindParam(':instalation_belongs_to_suscriptor', $instalationBelongsSuscriptor);
                $stmt->bindParam(':tvs_number', $tvsNumber);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class Reporte{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Reportes WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Reportes");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $idSuscriptor = $_PUT['id_suscriptor'];
                $idServicio = $_PUT['id_servicio'];
                $date = $_PUT['date'];
                $type = $_PUT['type'];
                $description = $_PUT['description'];
                $state = $_PUT['state'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Reportes (id_suscriptor,id_servicio,date,type,description,state)
                                                VALUES (:id_suscriptor,:id_servicio,:date,:type,:description,:state)");
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);
                $stmt->bindParam(':id_servicio', $idServicio);
                $stmt->bindParam(':date', $date);
                $stmt->bindParam(':type', $type);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':state', $state);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Reportes WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function deleteByServicio($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Reportes WHERE id_servicio = :id_servicio");
                $stmt->bindParam(':id_servicio', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function deleteBySuscriptor($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM Reportes WHERE id_suscriptor = :id_suscriptor");
                $stmt->bindParam(':id_suscriptor', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='deleteByServicio')
                    return $this->deleteByServicio($id);
                else if ($_POST['method']=='deleteBySuscriptor')
                    return $this->deleteBySuscriptor($id);
                $id = $_POST['id'];
                $idSuscriptor = $_POST['id_suscriptor'];
                $idServicio = $_POST['id_servicio'];
                $date = $_POST['date'];
                $type = $_POST['type'];
                $description = $_POST['description'];
                $state = $_POST['state'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Reportes SET id_suscriptor=:id_suscriptor,
                                        id_servicio=:id_servicio, date=:date, 
                                        type=:type, description=:description,
                                        state=:state WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':id_suscriptor', $idSuscriptor);
                $stmt->bindParam(':id_servicio', $idServicio);
                $stmt->bindParam(':date', $date);
                $stmt->bindParam(':type', $type);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':state', $state);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }

    class User{
        function init() {
            try {
                $dbh = new PDO('sqlite:reporteAverias.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($userName=null, $password=null) {
            $dbh = $this->init();
            try {
                if ($userName!=null && $password!=null) {
                    //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt = $dbh->prepare("SELECT * FROM Users WHERE user_name=:userName AND password=:password");
                    $stmt->bindParam(':userName', $userName);
                    $stmt->bindParam(':password', $password);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM Users");
                }
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            } catch (Exception $e) {
                echo "Failed: " . $e->getMessage();
            }
        }
        function put($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $user_name = $_PUT['userName'];
                $password = $_PUT['password'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO Users (user_name,password)
                                                VALUES (:user_name,:password)");
                $stmt->bindParam(':user_name', $user_name);
                $stmt->bindParam(':password', $password);

                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo $stmt->insert_id;
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM facturas WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo 'Successfull';
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function post($id=null) {
            $dbh = $this->init();
            try {
                $_POST=json_decode(file_get_contents('php://input'), True);
                if ($_POST['method']=='put')
                    return $this->put($id);
                else if ($_POST['method']=='delete')
                    return $this->delete($id);
                else if ($_POST['method']=='get')
                    return $this->get($_POST['userName'], $_POST['password']);
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
    }
    Toro::serve(array(
        "/Reporte" => "Reporte",
        "/Reporte/:alpha" => "Reporte",
        "/Servicio" => "Servicio",
        "/Servicio/:alpha" => "Servicio",
        "/Region" => "Region",
        "/Region/:alpha" => "Region",
        "/Cuadra" => "Cuadra",
        "/Cuadra/:alpha" => "Cuadra",
        "/Suscriptor" => "Suscriptor",
        "/Suscriptor/:alpha" => "Suscriptor",
        "/User" => "User",
        "/User/:alpha" => "User",
        "/Sucursal" => "Sucursal",
        "/Sucursal/:alpha" => "Sucursal"
    ));
?>
