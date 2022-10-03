import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import * as Device from "expo-device";

import { loginOrRegister } from "../../../store/user/user.service";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import {
  AuthOptionsContainer,
  AgreementText,
  Row,
  ButtonSmall,
} from "./authOptions.styles";

export const AuthOptions = ({ onTouch, goLogin, goRegister, page }) => {
  const dispatch = useDispatch();

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "592408622537822",
      });
      const res /* { type, token, expirationDate, permissions, declinedPermissions } */ =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (res.type === "success") {
        const formData = {
          device_name: `${Device.brand}-${Device.modelName}`,
          platform_token: res.token,
        };
        dispatch(loginOrRegister(formData));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <AuthOptionsContainer>
      <Row>
        <Spacer position="right" size="medium">
          <ButtonSmall onPress={facebookLogin}>
            <Spacer position="right" size="medium">
              <AntDesign name="facebook-square" size={18} color={"#ffffff"} />
            </Spacer>
            <Text variant="titleSmall">Facebook</Text>
          </ButtonSmall>
        </Spacer>
        <ButtonSmall onPress={onTouch}>
          <Spacer position="right" size="medium">
            <AntDesign name="google" size={18} color={"#ffffff"} />
          </Spacer>
          <Text variant="titleSmall">Google</Text>
        </ButtonSmall>
      </Row>
      <Spacer position="top" size="medium">
        <Row>
          <Spacer position="right" size="medium">
            <Text variant="label">Dou you have an account?</Text>
          </Spacer>
          <TouchableOpacity onPress={goLogin}>
            <AgreementText variant="brand">Login</AgreementText>
          </TouchableOpacity>
        </Row>
      </Spacer>
    </AuthOptionsContainer>
  );
};
