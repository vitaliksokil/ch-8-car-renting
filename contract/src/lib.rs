use std::collections::HashMap;
use near_sdk::{PromiseOrValue, Promise, near_bindgen, PanicOnDefault, BorshStorageKey, AccountId, borsh::{self, BorshDeserialize, BorshSerialize}, serde::{Deserialize, Serialize}, env, log};
use near_sdk::collections::{LazyOption, UnorderedMap};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Car {
    owner_id: AccountId,
    title: String,
    description: String,
    image:String,
    price_per_hour: u128,
    is_rented: bool,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub cars: UnorderedMap<u8, Car>,
    pub rents: UnorderedMap<u8, AccountId>, // id of car -> id of person who rented it.
    pub total_cars: u8, // id of car -> id of person who rented it.
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        Self {
            cars: UnorderedMap::new(b"d".to_vec()),
            rents: UnorderedMap::new(b"i".to_vec()),
            total_cars: 0
        }
    }


    pub fn get_all_cars(&self) -> HashMap<u8,Car>{
        self.cars.iter().collect()
    }

    pub fn get_car_by_id(&self, id: u8) -> Car {
        self.cars.get(&id).expect("Car doesn't exist")
    }

    pub fn get_cars_by_owner_id(&self, owner_account_id: AccountId) -> HashMap<u8, Car>{
        let all_cars: HashMap<u8, Car> = self.get_all_cars();
        let mut result: HashMap<u8, Car> = HashMap::new();
        for (key, val) in all_cars.iter() {
            if val.owner_id == owner_account_id {
                result.insert(*key, val.clone());
            }
        }
        result
    }

    pub fn get_rents_by_renter_id(&self, renter_account_id: AccountId) -> HashMap<u8, Car>{
        let all_rents: HashMap<u8, AccountId> = self.rents.iter().collect();
        let mut result: HashMap<u8, Car> = HashMap::new();
        for (key, val) in all_rents.iter() {
            if *val == renter_account_id {
                result.insert(*key, self.get_car_by_id(*key).clone());
            }
        }
        result
    }


    pub fn rent_car(&mut self, car_id:u8) {
        let mut car: Car = self.cars.get(&car_id).expect("Car doesn't exist");
        let renter_id: AccountId = env::predecessor_account_id();
        car.is_rented = true;
        self.cars.remove(&car_id);
        self.cars.insert(&car_id, &car);
        self.rents.insert(&car_id, &renter_id);
    }

    pub fn stop_rent_car(&mut self, car_id:u8) {
        let mut car: Car = self.cars.get(&car_id).expect("Car doesn't exist");
        car.is_rented = false;
        self.cars.remove(&car_id);
        self.cars.insert(&car_id, &car);
        self.rents.remove(&car_id);
    }


    pub fn add_new_car(
        &mut self,
        title: String,
        description: String,
        image:String,
        price_per_hour: String,
    ) {
        let price_u128:u128 = price_per_hour.parse::<u128>().unwrap();

        assert!(title != "", "Abort. Title is empty");
        assert!(description != "", "Abort. Description is empty");
        assert!(image != "", "Abort. Image is empty");
        assert!(price_u128 != 0, "Abort. Price cannot be zero.");

        self.total_cars += 1;
        let id: u8 = self.total_cars;

        self.cars.insert(
            &id,
            &Car {
                owner_id : env::predecessor_account_id(),
                title,
                description,
                image,
                price_per_hour: price_u128,
                is_rented: false
            },
        );
    }

}



#[cfg(test)]
mod tests {

}
