import router from "../../router/";

export default function navigate(name, params) {
  const currentRoute = router.history.current.name;
  if (currentRoute !== name) {
    return router.push({
      name,
      params,
    });
  }
}
