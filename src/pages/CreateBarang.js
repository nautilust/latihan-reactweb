import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function CreateBarang() {
  let history = useHistory();
  let apiUrl = "http://backendpkl.spacearts.id/api";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  function routeBarang() {
    history.push("/barang");
  }

  function toastMsgHandler(status, msg) {
    let msgString = toString(msg);

    if (status === true) {
      setToastMsg("Berhasil menambahkan data barang!");
      setToastShow(true);
    } else {
      setToastMsg("Gagal menambahkan data barang! Alasan: " + msgString);
      setToastShow(true);
      setDisabled(false);
    }
  }

  async function createData() {
    try {
      setDisabled(true);
      const response = await axios.post(apiUrl + "/barang/create", {
        nama: name,
        harga: price,
        kategori: category,
      });
      if (response.data._message === "OK") {
        toastMsgHandler(true);
        await timeout(3500);
        routeBarang();
      } else {
        toastMsgHandler(
          false,
          response.data._status + " - " + response.data._message
        );
      }
    } catch (err) {
      toastMsgHandler(false, err);
    }
  }

  return (
    <div className="mx-5 my-3">
      <h1>Tambah Data Barang</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formNama">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHarga">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="number"
            placeholder="Masukkan harga"
            disabled={disabled}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formKategori">
          <Form.Label>Kategori</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan kategori"
            disabled={disabled}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" disabled={disabled} onClick={createData}>
          Tambah
        </Button>{" "}
        <Button variant="warning" type="reset" disabled={disabled}>
          Reset
        </Button>{" "}
        <Button variant="secondary" disabled={disabled} onClick={routeBarang}>
          Batal
        </Button>
      </Form>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={3000}
          bg="info"
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              <FaInfoCircle /> Informasi
            </strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default CreateBarang;
