import { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { IHeroes } from "../../../types/IHeroes";
import { heroesData } from "../../../data/heroes";
import { InputGroup, Form } from "react-bootstrap"; 
import { CardHero } from "../../ui/CardHero/CardHero";
import styles from "./Search.module.css";

export const Search = () => {
  const { values, handleChange } = useForm({
    search: "",
  });

  const { search } = values;
  const [heroes, setHeroes] = useState<IHeroes[]>([]);

  useEffect(() => {
    const result = heroesData.filter((h) =>
      h.superhero.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    setHeroes(result);
  }, [search]);

  return (
    <div className="styles.containerSearch">
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>Ingrese un héroe</InputGroup.Text>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="Buscar héroe"
          />
        </InputGroup>
      </div>
      <div>
        {heroes.length > 0 ? (
          <div>
            {heroes.map((hero) => (
              
              <div key={hero.id}>

                <CardHero hero={hero} />

              </div>


            ))}
          </div>
        ) : (
          <div>
            <h2>No coincide la búsqueda</h2>
          </div>
        )}
      </div>
    </div>
  );
};
