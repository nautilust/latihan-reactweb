import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Alert, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function EditBarang() {
  let query = useQuery();
  let history = useHistory();
  let apiUrl = "http://backendpkl.spacearts.id/api";
  let dataId = query.get("id");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  function toastMsgHandler(status, msg) {
    let msgString = toString(msg);

    if (status === true) {
      setToastMsg("Berhasil memperbarui data barang!");
      setToastShow(true);
    } else {
      setToastMsg("Gagal memperbarui data barang! Alasan: " + msgString);
      setToastShow(true);
      setDisabled(false);
    }
  }

  async function getData() {
    try {
      const response = await axios.get(apiUrl + "/barang/detail/" + dataId);
      if (response.data._message === "OK") {
        setName(response.data._data.nama);
        setPrice(response.data._data.harga);
        setCategory(response.data._data.kategori);
      } else {
        setError(response.data._status + " - " + response.data._message);
        await timeout(3000);
        routeBarang();
      }
    } catch (err) {
      setError(toString(err));
      await timeout(3000);
      routeBarang();
    }
  }

  async function updateData() {
    try {
      setDisabled(true);
      const response = await axios.put(apiUrl + "/barang/update", {
        id: dataId,
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

  function routeBarang() {
    history.push("/barang");
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="mx-5 my-3">
        <Alert variant="danger">Kesalahan! Alasan: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="mx-5 my-3">
      <h1>Edit Data Barang</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formId">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="ID" value={dataId} readOnly />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNama">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            value={name}
            disabled={disabled}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHarga">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="number"
            placeholder="Masukkan harga"
            value={price}
            disabled={disabled}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formKategori">
          <Form.Label>Kategori</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan kategori"
            value={category}
            disabled={disabled}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" disabled={disabled} onClick={updateData}>
          Perbarui
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

export default EditBarang;
