import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
  {
    id: 1,
    userId: 'hemantkumar',
    firstName: 'Hemant',
    lastName: 'Kumar',
    password: 'Pa$$w0rd'
  }
];

const categories = [
  {
    id: 1,
    name: 'Sofas'
  },
  {
    id: 2,
    name: 'Chairs'
  },
  {
    id: 3,
    name: 'Tables'
  },
  {
    id: 4,
    name: 'Beds'
  },
  {
    id: 5,
    name: 'Mattresses'
  },
  {
    id: 6,
    name: 'Storage'
  },
];
const products = [
  {
    id: 1,
    name: '1 Seater Sofa',
    description: 'Valery 1 Seater Sofa in Safari Brown Colour with Brown Oak Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/v/a/568x625/valery-1-seater-sofa-in-safari-brown-colour-with-brown-oak-finish-by-casacraft-valery-1-seater-sofa--olb0my.jpg',
    price: 17499,
    categoryId: 1,
    rating: 4
  },
  {
    id: 2,
    name: '2 Seater Sofa',
    description: 'Bali 2 Seater Sofa in Blue Colour',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/b/a/568x284/bali-2-seater-sofa-in-blue-colour-by-trevi-furniture-bali-2-seater-sofa-in-blue-colour-by-trevi-furn-rkdt19.jpg',
    price: 29999,
    categoryId: 1,
    rating: 5
  }, {
    id: 3,
    name: '3 Seater Sofa',
    description: 'Mia 3 Seater Sofa in Brown Colour',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/m/i/568x284/mia-three-seater-sofa-in-brown-colour-by-casacraft-mia-three-seater-sofa-in-brown-colour-by-casacraf-vqcu1t.jpg',
    price: 38499,
    categoryId: 1,
    rating: 4
  },
  {
    id: 4,
    name: 'Arm Chair',
    description: 'Valentino Armchair in Teak Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/v/a/568x625/valentino-armchair-valentino-armchair-zpfyzl.jpg',
    price: 7999,
    categoryId: 2,
    rating: 5
  }, {
    id: 5,
    name: 'Office Chair',
    description: 'Crown High Back Executive Chair In Brown Colour',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/c/r/568x625/crown-high-back-executive-chair-in-brown-colour-by-krisskross-crown-high-back-executive-chair-in-bro-emyn5f.jpg',
    price: 13499,
    categoryId: 2,
    rating: 4
  }, {
    id: 6,
    name: 'Rocking Chair',
    description: 'Presley Solid Wood Rocking Chair in Provincial Teak Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/w/e/568x625/wellesley-solid-wood-rocking-chair-in-provincial-teak-finish-by-amberville-wellesley-solid-wood-rock-pzovki.jpg',
    price: 15199,
    categoryId: 2,
    rating: 4
  }, {
    id: 7,
    name: 'Coffee Table',
    description: 'Melbo Coffee Table in Dark Brown Color',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/m/e/568x625/melbo-coffee-table-in-dark-brown-color-by-tadesign-melbo-coffee-table-in-dark-brown-color-by-tadesig-c2q7ba.jpg',
    price: 6999,
    categoryId: 3,
    rating: 5
  },
  {
    id: 8,
    name: 'Dressing Table',
    description: 'Kazashi Dresser in Wenge Color',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/k/a/568x625/kazashi-dresser-in-wenge-colour---mintwud-by-pepperfry-kazashi-dresser-in-wenge-colour---mintwud-by--pyfzum.jpg',
    price: 20499,
    categoryId: 3,
    rating: 5
  },
  {
    id: 9,
    name: 'Study Table',
    description: 'Benberg Solid Wood Study Table In Walnut Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/b/e/568x625/benberg-solid-wood-study-table-in-walnut-finish-by-bohemiana-benberg-solid-wood-study-table-in-walnu-xwdbjo.jpg',
    price: 15999,
    categoryId: 3,
    rating: 4
  },
  {
    id: 10,
    name: 'Single Bed',
    description: 'Stigen Solid Wood Single Bed with Storage in Provincial Teak Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/s/t/568x625/stigen-solid-wood-single-bed-with-storage-in-provincial-teak-finish-by-woodsworth-stigen-solid-wood--y6gutn.jpg',
    price: 33999,
    categoryId: 4,
    rating: 4
  },
  {
    id: 11,
    name: 'Queen Size Bed',
    description: 'Gunner Queen Size Bed with Storage in Wenge Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/g/u/568x625/gunner-queen-size-bed-with-storage-in-wenge-finish-by--home-gunner-queen-size-bed-with-storage-in-we-6wvokm.jpg',
    price: 20500,
    categoryId: 4,
    rating: 5
  },
  {
    id: 12,
    name: 'King Size Bed',
    description: 'Yuuna King Size Bed with Storage in Wenge Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/y/u/568x625/yuuna-king-size-bed-with-storage-in-wenge-finish-by-mintwud-yuuna-king-size-bed-with-storage-in-weng-9c3e3l.jpg',
    price: 33999,
    categoryId: 4,
    rating: 4
  },
  {
    id: 13,
    name: 'Single Mattresses',
    description: 'Cumulus Premium Orthopedic 6 Inches Single Size Cool Gel & HR Foam Mattress',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/c/u/568x625/cumulus-premium-single-size-6-inches-cool-gel---hr-foam-mattress-by-clouddio-cumulus-premium-single--qa0qkc.jpg',
    price: 11649,
    categoryId: 5,
    rating: 5
  },
  {
    id: 14,
    name: 'Queen Size Mattresses',
    description: 'Platinum Euro Top 10 Inches Queen Size Bonnell Spring & Memory Foam Mattress',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/p/l/568x625/platinum-euro-top-bonnell-spring---memory-foam-queen-size-10--thick-mattress-by-gilson-platinum-euro-2qlbqj.jpg',
    price: 34489,
    categoryId: 5,
    rating: 4
  },
  {
    id: 15,
    name: 'King Size Mattresses',
    description: 'Foam King Size 10" Thick Mattress',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/f/o/568x625/foam-king-size-10--thick-mattress-by-sleepspa-foam-king-size-10--thick-mattress-by-sleepspa-djkgmp.jpg',
    price: 20949,
    categoryId: 5,
    rating: 5
  },
  {
    id: 16,
    name: 'Wardrobe',
    description: 'Kuruma 3 Door Wardrobe in Wenge Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/k/u/568x625/kuruma-3-door-wardrobe-in-wenge-finish-by-mintwud-kuruma-3-door-wardrobe-in-wenge-finish-by-mintwud-hokfo8.jpg',
    price: 17999,
    categoryId: 6,
    rating: 4
  },
  {
    id: 17,
    name: 'Cabinet',
    description: 'Entouch Solid Wood Cabinet in Distress Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/e/n/568x625/entouch-solid-wood-cabinet-in-distress-finish-by-bohemiana-entouch-solid-wood-cabinet-in-distress-fi-rmq6qm.jpg',
    price: 32999,
    categoryId: 6,
    rating: 4
  },
  {
    id: 18,
    name: 'Book Shelf',
    description: 'Acropolis Solid Wood Book Shelf in Provincial Teak Finish',
    imageUrl: 'https://ii1.pepperfry.com/media/catalog/product/a/c/568x625/acropolis-solid-wood-book-shelf-in-provincial-teak-finish-by-woodsworth-acropolis-solid-wood-book-sh-f22mbt.jpg',
    price: 33499,
    categoryId: 6,
    rating: 5
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(100))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/user/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/user/register') && method === 'POST':
          return register();
        case url.endsWith('/user/isUserIdAvailable') && method === 'POST':
          return isUserIdAvailable();
        case url.endsWith('/products') && method === 'GET':
          return getProducts();
        case url.match(/\/products\/\d+$/) && method === 'GET':
          return getProductById();
        case url.endsWith('/categories') && method === 'GET':
          return getCategories();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate() {
      const { userId, password } = body;
      const user = users.find(x => x.userId === userId && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName
      })
    }

    function register() {
      const user = body;
      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      return ok(user);
    }

    function isUserIdAvailable() {
      let isAvailable = true;
      if (users.find(x => x.userId === body)) {
        isAvailable = false;
      }
      return ok(isAvailable);
    }

    function getProducts() {
      return ok(products);
    }

    function getCategories() {
      return ok(categories);
    }

    function getProductById() {
      const product = products.find(x => x.id === idFromUrl());
      if (product) {
        return ok(product);
      } else {
        return error('Product does not exists.');
      }
    }

    // helper functions

    function ok(reqBody?) {
      return of(new HttpResponse({ status: 200, body: reqBody }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 10);
    }
  }
}

