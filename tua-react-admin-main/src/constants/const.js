export const gridSpacing = 3;
export const drawerWidth = 250;
export const imgDefault = {
  src: "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png",
  style: {
    maxHeight: "100%",
    width: "100%",
  },
};
export const menuAPI = {
  login: "http://localhost:8080/auth/login",
  profile: "http://localhost:8080/auth/profile",
  customer: "http://localhost:80/v1/controller/list_customer.php",
  trainer: "http://localhost:80/v1/controller/list_trainer.php",
  schedule: "http://localhost:80/v1/controller/list_class.php",
  class: "http://localhost:80/v1/controller/class.php",
  classes: "http://localhost:80/v1/controller/classes.php",
  motorbike: "http://localhost:8080/v1/motorbikes",
  model: "http://localhost:8080/v1/models",
  brand: "http://localhost:8080/v1/brands",
  category: "http://localhost:8080/v1/categories",
  ticket: "http://localhost:8080/v1/tickets",
  ticketUpdateTrack: "http://localhost:8080/v1/ticketUpdateTrack",
  statistics: "http://localhost:80/v1/controller/revenue_statistic.php",
  register_statistics: "http://localhost:80/v1/controller/register_statistic.php",
};
