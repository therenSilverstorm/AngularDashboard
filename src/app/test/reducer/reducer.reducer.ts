import { createAction, props, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
export interface Customer {
  id: number;
  name: string;
  articles: EntityState<Article>;
}

export interface Article {
  sku: string;
  amount: number;
}

export const customersLoaded = createAction(
  "customers loaded",
  props<{ customers: Customer[] }>()
);

export const articleAdded = createAction(
  "article added",
  props<{ customerId: number; articleSku: string }>()
);

export const articleIncremented = createAction(
  "article incremented",
  props<{ customerId: number; articleSku: string }>()
);

export const articleDecremented = createAction(
  "article decremented",
  props<{ customerId: number; articleSku: string }>()
);

export interface State extends EntityState<Customer> {}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const articleAdapter: EntityAdapter<Article> = createEntityAdapter<
  Article
  >({
  selectId: article => article.sku
});

export const initialState: State = adapter.getInitialState();

export const customersReducer = createReducer(
  initialState,
  on(customersLoaded, (state, action) =>
    adapter.setAll(action.customers, state)
  ),
  on(articleAdded, (state, action) =>
    adapter.updateOne(
      {
        id: action.customerId,
        changes: {
          articles: articleAdapter.addOne(
            { sku: action.articleSku, amount: 1 },
            state.entities[action.customerId].articles
          )
        }
      },
      state
    )
  ),

  on(articleIncremented, (state, action) =>
    adapter.mapOne(
      {
        id: action.customerId,
        map: customer => ({
          ...customer,
          articles: articleAdapter.map(
            article =>
              article.sku === action.articleSku
                ? { ...article, amount: article.amount + 1 }
                : article,
            customer.articles
          )
        })
      },
      state
    )
  ),

  on(articleDecremented, (state, action) => {
    const currentAmount = state.entities[action.customerId]?.articles.entities[action.articleSku]?.amount || 0
    if(currentAmount === 1) {
      return adapter.mapOne(
        {
          id: action.customerId,
          map: customer => ({
            ...customer,
            articles: articleAdapter.removeOne(
              action.articleSku,
              customer.articles
            )
          })
        },
        state
      );
    }

    return adapter.mapOne(
      {
        id: action.customerId,
        map: customer => ({
          ...customer,
          articles: articleAdapter.updateOne(
            {
              id: action.articleSku,
              changes: {
                amount: currentAmount - 1
              }
            },
            customer.articles
          )
        })
      },
      state
    );
  })
);

export const customersSelectors = adapter.getSelectors((s: any) => s.customers);

// helper method to create customers
let customerId = 0;
export function createCustomer(): Customer {
  return {
    id: ++customerId,
    name: `Customer ${customerId}`,
    articles: articleAdapter.getInitialState()
  };
}


