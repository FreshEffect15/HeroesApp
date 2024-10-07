import { heroesData } from "../../../data/heroes";
import { ListHeroes } from "../../ui/Header/ListHeroes/ListHeroes";


export const Home = () => {
  return <ListHeroes heroes={heroesData} title="Todos los heroes"/>
}
export default Home;
