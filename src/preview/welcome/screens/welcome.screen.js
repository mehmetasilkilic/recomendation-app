import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import * as Device from "expo-device";

import { register } from "../../../store/user/user.service";

import { SafeArea } from "../../../components/utils/safeArea.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Button } from "../../../components/button/button.component";

import { AuthOptions } from "../components/authOptions.component";
import { Agreements } from "../components/agreements.component";

import {
  AuthContainer,
  WelcomeContainer,
  AgreementText,
  MidRow,
  OrContainer,
} from "./welcome.styles";

export const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();

  const nav = () => navigation.navigate("Onboarding");
  const goLogin = () => navigation.navigate("Login");

  const deviceName = `${Device.brand}-${Device.modelName}`;

  const formData = {
    device_name: deviceName,
  };

  const handleGuestRegister = () => {
    dispatch(register(formData));
  };

  return (
    <SafeArea>
      <WelcomeContainer>
        <Text variant="fobboLogo">fobbo</Text>
        <AuthContainer>
          <Spacer position="bottom" size="medium">
            <TouchableOpacity onPress={handleGuestRegister}>
              <AgreementText variant="brand">Continue as a guest</AgreementText>
            </TouchableOpacity>
          </Spacer>
          <Button
            onTouch={() => navigation.navigate("Register")}
            text="Register"
          />
          <Spacer position="bottom" size="large" />
          <MidRow>
            <OrContainer>
              <Text variant="whiteButton">OR</Text>
            </OrContainer>
          </MidRow>
          <AuthOptions onTouch={nav} goLogin={goLogin} />
          <Agreements />
        </AuthContainer>
      </WelcomeContainer>
    </SafeArea>
  );
};
