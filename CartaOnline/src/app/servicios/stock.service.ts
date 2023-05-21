import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url = "http://localhost:3001/";
  constructor(private http: HttpClient) { }

  pedidos() {
    return this.http.get(this.url + "pedidos");
  }

  productos() {
    return this.http.get(this.url + "productos");
  }

  precio() {
    return this.http.get(this.url + "precio");
  }

}
