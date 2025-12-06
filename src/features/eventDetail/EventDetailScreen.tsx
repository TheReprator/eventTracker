import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList, ROUTES } from "@/types/navigation";

import { Header } from "./components/Header";
import { BannerImage } from "./components/BannerImage";
import { VenueMap } from "./components/VenueMap";
import { DetailItem } from "./components/DetailItem";
import { DetailSection } from "./components/DetailSection";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BaseTheme } from "@/appConfiguration/theme/theme";
import { useAppTheme } from "@/appConfiguration/theme/ThemeContext";
import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";

type EventDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.EventDetail
>;

export default function EventDetailScreen() {
  const { item } = useRoute<EventDetailRouteProp>().params;
  const venue = item.venueInfo;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const theme = useAppTheme();
  const styles = makeStyles(theme.theme);

  const { t } = useAppLocale();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: insets.top }]}>

        <Header back={() => navigation.goBack()} />

        <BannerImage uri={item.imageUrl} />

        <DetailSection title={t("eventDetailScreen.titleEventDetail")}>
          <DetailItem label={t("eventDetailScreen.titleEventName")} value={item.name} />
          <DetailItem label={t("eventDetailScreen.titleEventType")} value={item.type} />
          <DetailItem label={t("eventDetailScreen.titleEventDate")} value={item.date} />
        </DetailSection>

        <DetailSection title={t("eventDetailScreen.titleVenueDetail")} >
          <DetailItem label={t("eventDetailScreen.titleVenueName")} value={venue.name} />
          <DetailItem label={t("eventDetailScreen.titleVenueCity")} value={venue.city} />
          <DetailItem label={t("eventDetailScreen.titleVenuAddress")} value={venue.address} />
          <DetailItem
            label="Coordinates"
            value={`${venue.location.latitude}, ${venue.location.longitude}`}
          />
        </DetailSection>

        <VenueMap venue={venue} />

      </View>
    </ScrollView>
  );
}

const makeStyles = ({ spacing, colors }: BaseTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.medium,
      gap: spacing.large
    },
  });