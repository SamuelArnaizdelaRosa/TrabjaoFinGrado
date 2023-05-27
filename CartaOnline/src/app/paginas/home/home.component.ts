import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Producto } from 'src/app/modelos/producto';
import { LoginService } from 'src/app/servicios/login.service';
import { StockService } from 'src/app/servicios/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public listaProductos: Producto[];
  public listaPedidos: any[];
  public categorias: Map<any, any>;
  public categoriaSeleccionada: number;
  public precios: Map<any, any>;
  public registrado: boolean;

  constructor(public stockService: StockService, public loginService: LoginService, public cookie: CookieService) {
    this.listaProductos = [];
    this.listaPedidos = []
    this.categorias = new Map();
    this.categoriaSeleccionada = 0;
    this.precios = new Map();
    this.registrado = false;
  }

  ngOnInit(): void {
    this.stockService.productos().subscribe((productos: any) => {
      productos.forEach((producto: Producto) => {
        this.listaProductos.push(producto);
      });
    });

    this.stockService.precio().subscribe((data: any) => {
      data.forEach((element: { article: any; price: any; }) => {
        this.precios.set(element.article, element.price);
      });
    });

    this.stockService.pedidos().subscribe((data: any) => {
      data.forEach((element: { article: any, amount: any }) => {
        this.listaPedidos.push({ article: element.article, amount: element.amount });
      });
    });
  }

  printCarta() {

    if (this.cookie.get("registrado") === "si") {
      this.registrado = true;
    } else {
      this.registrado = false;
    }

    var rep = 0;
    this.listaProductos.forEach(element => {
      element.stock = true;
      if (element.parent == null) {
        this.listaProductos.forEach(elemento => {
          if (element.number == elemento.parent) {
            rep++;
          }
        });
        if (element.description1 && rep > 1) {
          this.categorias.set(element.number, element.description1);
        }
        rep = 0;
      }

      for(let i=0;i<this.listaPedidos.length;i++){
        if (element.number === this.listaPedidos[i].article) {
          element.stock = false;
          
        }
      }

    });



  }

  mostrarCategoria(key: number) {
    this.categoriaSeleccionada = key;
  }

}
