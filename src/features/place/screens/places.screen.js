import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safeArea.component";

import { PlaceInfoCard } from "../../../components/place/placeInfoCard.components";
import { Search } from "../../../components/search/search.component";
import { Loading } from "../../../components/loading/loading.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { PlacesContext } from "../../../services/places/places.context";

import { PlacesList, PlacesContainer, Row, InnerRow } from "./places.styles";

export const PlacesScreen = ({ navigation }) => {
  const { places, isLoading } = useContext(PlacesContext);
  const [toggleAppearance, setToggleAppearance] = useState(false);

  return (
    <>
      <SafeArea>
        {isLoading && <Loading />}
        <Search />
        <Row>
          <Text variant="label">Trending</Text>
          <InnerRow>
            <Spacer position="right" size="medium">
              <Text variant="caption">Appearance</Text>
            </Spacer>
            <TouchableOpacity
              onPress={() => {
                setToggleAppearance(!toggleAppearance);
              }}
            >
              <AntDesign
                name={toggleAppearance ? "appstore-o" : "laptop"}
                size={24}
                color={"#9C1F19"}
              />
            </TouchableOpacity>
          </InnerRow>
        </Row>
        <PlacesContainer>
          <PlacesList
            numColumns={toggleAppearance ? 1 : 2}
            key={toggleAppearance ? 1 : 2}
            data={places}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlaceDetail", {
                      place: item,
                    })
                  }
                >
                  <Spacer position="bottom" size="medium">
                    <PlaceInfoCard
                      place={item}
                      cardStyle={toggleAppearance ? "vertical" : "small"}
                    />
                  </Spacer>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        </PlacesContainer>
      </SafeArea>
    </>
  );
};
