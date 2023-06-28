import styled from "styled-components";
import { Pokemon, PokemonSprite } from "../types/Pokemon";

const VerticalMargin = styled.View`
  margin: ${(props: { padding: number }) => props.padding}px 
          0px
          ${(props: { paddingBottom?: number, padding: number }) => props.paddingBottom ? props.paddingBottom : props.padding}px
          0px;
`;

const treatText = (text: string | undefined): string | undefined => {
  if(text === undefined){
    return text;
  }
  const treated = text.replace('-', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return treated;
}

const treatId = (id: number | undefined): string | undefined => {
  if(id === undefined){
    return id;
  }
  const treated = id.toString().padStart(3, "0");
  return treated;
}

const getPokemonSprite = (sprites: Array<{ sprites: string }>): string => {
  const raw = sprites[0].sprites;
  if(raw !== undefined){
      const treated = raw.replace("\\", " ");
      const spriteObj = JSON.parse(treated) as PokemonSprite;
      return spriteObj.front_default;
  }
  return '';
}

export { VerticalMargin, treatText, treatId, getPokemonSprite };
