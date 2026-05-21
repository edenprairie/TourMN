import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GripVertical, Copy, RotateCcw, Map, List } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { BrandCard } from '../components/Cards';
import styles from './Pages.module.css';

type PlaceRef = {
  id: string;
  lat: number;
  lng: number;
  mapQuery?: string;
  mapUrl?: string;
};

type Category = {
  id: string;
  places: PlaceRef[];
};

type OrderDraft = Record<string, string[]>;

const ADMIN_STORAGE_KEY = 'tourmn.food-drink.admin';
const ORDER_STORAGE_KEY = 'tourmn.food-drink.order.v1';

const foodDrinkCategories: Category[] = [
  {
    id: 'restaurants',
    places: [
      { id: 'spoon_and_stable', lat: 44.9815, lng: -93.2788, mapQuery: 'Spoon and Stable Minneapolis MN' },
      { id: 'restaurant_alma', lat: 44.9889, lng: -93.2576, mapQuery: 'Restaurant Alma Minneapolis MN' },
      { id: 'hai_hai', lat: 44.9986, lng: -93.2668, mapQuery: 'Hai Hai Minneapolis MN' },
      { id: 'meritage', lat: 44.9488, lng: -93.0954, mapQuery: 'Meritage Saint Paul MN' },
      { id: 'vinai', lat: 44.9992, lng: -93.2662, mapQuery: 'Vinai 1300 NE 2nd St Minneapolis MN' },
      { id: 'demi', lat: 44.9848, lng: -93.2701, mapQuery: 'Demi 212 N 2nd St Minneapolis MN' },
      { id: 'one_twelve_eatery', lat: 44.9843, lng: -93.2712, mapQuery: '112 Eatery 112 N 3rd St Minneapolis MN' },
      { id: 'bar_la_grassa', lat: 44.989, lng: -93.2797, mapQuery: 'Bar La Grassa 800 Washington Avenue North Minneapolis MN' },
      { id: 'ie_italian_eatery', lat: 44.9164, lng: -93.2474, mapQuery: 'Italian Eatery 4724 Cedar Avenue Minneapolis MN' },
      { id: 'ichiban_sushi_edina', lat: 44.8764, lng: -93.3393, mapQuery: 'Ichiban Sushi 3529 W 70th St Edina MN' },
      { id: 'matts_bar', lat: 44.9398, lng: -93.2548, mapQuery: "Matt's Bar Minneapolis MN" },
      { id: 'colita', lat: 44.9303, lng: -93.298, mapQuery: 'Colita Minneapolis MN' },
      { id: 'aster_cafe', lat: 44.9832, lng: -93.2586, mapQuery: 'Aster Cafe Minneapolis MN' },
      { id: 'khaluna', lat: 44.9481, lng: -93.2945, mapQuery: 'Khaluna Minneapolis MN' },
      { id: 'myriel', lat: 44.9167, lng: -93.1703, mapQuery: 'Myriel Saint Paul MN' },
      { id: 'porzana', lat: 44.9825, lng: -93.278, mapQuery: 'Porzana Minneapolis MN' },
      { id: 'nolos', lat: 44.9841, lng: -93.277, mapQuery: "NOLO's Kitchen and Bar Minneapolis MN" },
      { id: 'smack_shack', lat: 44.9863, lng: -93.2785, mapQuery: 'Smack Shack Minneapolis MN' },
      { id: 'oceanaire', lat: 44.9774, lng: -93.2708, mapQuery: 'The Oceanaire Seafood Room 50 S 6th St Minneapolis MN' }
    ]
  },
  {
    id: 'breweries',
    places: [
      { id: 'surly', lat: 44.9736, lng: -93.2277, mapQuery: 'Surly Brewing Minneapolis MN' },
      { id: 'summit', lat: 44.931, lng: -93.1218, mapQuery: 'Summit Brewing Saint Paul MN' },
      { id: 'saint_paul_brewing', lat: 44.9627, lng: -93.0733, mapQuery: 'Saint Paul Brewing 688 Minnehaha Avenue East Saint Paul MN' },
      { id: 'indeed', lat: 44.9982, lng: -93.2661, mapQuery: 'Indeed Brewing Minneapolis MN' },
      { id: 'fair_state', lat: 45.0003, lng: -93.2665, mapQuery: 'Fair State Brewing Minneapolis MN' },
      { id: 'utepils', lat: 44.9782, lng: -93.3088, mapQuery: 'Utepils Brewing Minneapolis MN' },
      { id: 'blackstack', lat: 44.9568, lng: -93.1655, mapQuery: 'BlackStack Brewing Saint Paul MN' },
      { id: 'pryes', lat: 44.9849, lng: -93.2878, mapQuery: 'Pryes Brewing Minneapolis MN' },
      { id: 'falling_knife', lat: 45.0056, lng: -93.2515, mapQuery: 'Falling Knife Brewing Minneapolis MN' },
      { id: 'bauhaus', lat: 45.0022, lng: -93.2668, mapQuery: 'Bauhaus Brew Labs Minneapolis MN' },
      { id: 'modist', lat: 44.984, lng: -93.2765, mapQuery: 'Modist Brewing Minneapolis MN' }
    ]
  },
  {
    id: 'vineyards',
    places: [
      { id: 'alexis_bailly', lat: 44.7268, lng: -92.8515, mapQuery: 'Alexis Bailly Vineyard Hastings MN' },
      { id: 'saint_croix', lat: 45.195, lng: -92.81, mapQuery: 'Saint Croix Vineyards Stillwater MN' },
      { id: 'schram', lat: 44.8482, lng: -93.7804, mapQuery: 'Schram Vineyards Waconia MN' },
      { id: 'sovereign_estate', lat: 44.8586, lng: -93.7865, mapQuery: 'Sovereign Estate Waconia MN' },
      { id: 'winehaven', lat: 45.2729, lng: -92.9875, mapQuery: 'Winehaven Winery Chisago City MN' },
      { id: 'seven_vines', lat: 45.0474, lng: -92.963, mapQuery: '7 Vines Vineyard Dellwood MN' },
      { id: 'parley_lake', lat: 44.8327, lng: -93.7861, mapQuery: 'Parley Lake Winery Waconia MN' },
      { id: 'cannon_river', lat: 44.5074, lng: -92.905, mapQuery: 'Cannon River Winery Cannon Falls MN' },
      { id: 'two_silo', lat: 45.0742, lng: -92.997, mapQuery: 'Two Silo Winery White Bear Lake MN' },
      { id: 'wild_mountain', lat: 45.1992, lng: -92.816, mapQuery: 'Wild Mountain Winery Marine on Saint Croix MN' }
    ]
  },
  {
    id: 'chinese_restaurants',
    places: [
      { id: 'peking_garden', lat: 44.9555, lng: -93.1166, mapUrl: 'https://maps.app.goo.gl/XQd2dodx5EegHL2Q8' },
      { id: 'mandarin_kitchen', lat: 44.8611, lng: -93.2622, mapQuery: 'Mandarin Kitchen Bloomington MN' },
      { id: 'jade_dynasty', lat: 44.9484, lng: -93.2888, mapQuery: 'Jade Dynasty Minneapolis MN' },
      { id: 'legendary_spice', lat: 44.9729, lng: -93.227, mapQuery: 'Legendary Spice Minneapolis MN' },
      { id: 'tea_house', lat: 44.9707, lng: -93.2818, mapQuery: 'Tea House Minneapolis MN' },
      { id: 'master_noodle', lat: 44.9792, lng: -93.235, mapQuery: 'Master Noodle Minneapolis MN' },
      { id: 'grand_szechuan', lat: 44.8603, lng: -93.325, mapQuery: 'Grand Szechuan Bloomington MN' },
      { id: 'ju_yuan', lat: 44.9777, lng: -93.358, mapQuery: 'Ju Yuan Golden Valley MN' },
      { id: 'home_taste', lat: 44.9478, lng: -93.3465, mapQuery: 'Home Taste Saint Louis Park MN' },
      { id: 'hong_kong_noodle', lat: 44.8611, lng: -93.2622, mapUrl: 'https://maps.app.goo.gl/8GJTcyihMtEHm6ho7' },
      { id: 'northern_kitchen', lat: 44.8614, lng: -93.2672, mapUrl: 'https://maps.app.goo.gl/cH4PH7SkwgEyWjU3A' }
    ]
  },
  {
    id: 'cafes_bakeries',
    places: [
      { id: 'patisserie_46', lat: 44.9287, lng: -93.286, mapQuery: 'Patisserie 46 Minneapolis MN' },
      { id: 'marc_heu', lat: 44.9481, lng: -93.105, mapQuery: 'Marc Heu Patisserie Saint Paul MN' },
      { id: 'rustica', lat: 44.934, lng: -93.298, mapQuery: 'Rustica Bakery Minneapolis MN' },
      { id: 'isles_bun', lat: 44.9489, lng: -93.2941, mapQuery: 'Isles Bun and Coffee Minneapolis MN' },
      { id: 'black_walnut', lat: 44.9817, lng: -93.2757, mapQuery: 'Black Walnut Bakery Minneapolis MN' },
      { id: 'angel_food', lat: 44.9801, lng: -93.27, mapQuery: 'Angel Food Bakery Minneapolis MN' },
      { id: 'cafe_ceres', lat: 44.9488, lng: -93.2984, mapQuery: 'Cafe Ceres Minneapolis MN' },
      { id: 'french_meadow', lat: 44.948, lng: -93.288, mapQuery: 'French Meadow Bakery Minneapolis MN' },
      { id: 'keys_cafe', lat: 44.9509, lng: -93.09, mapQuery: 'Keys Cafe Saint Paul MN' },
      { id: 'patricks_bakery', lat: 44.9117, lng: -93.3511, mapQuery: "Patrick's Bakery Edina MN" }
    ]
  }
];

function buildDefaultOrder(categories: Category[]): OrderDraft {
  return Object.fromEntries(categories.map((category) => [category.id, category.places.map((place) => place.id)]));
}

function buildPlaceLookup(categories: Category[]): Record<string, Record<string, PlaceRef>> {
  return Object.fromEntries(
    categories.map((category) => [
      category.id,
      Object.fromEntries(category.places.map((place) => [place.id, place]))
    ])
  );
}

function normalizeOrder(defaultOrder: OrderDraft, candidate: unknown): OrderDraft {
  if (!candidate || typeof candidate !== 'object') {
    return defaultOrder;
  }

  const parsed = candidate as Record<string, unknown>;

  return Object.fromEntries(
    Object.entries(defaultOrder).map(([categoryId, defaultIds]) => {
      const rawIds = Array.isArray(parsed[categoryId]) ? parsed[categoryId].filter((id): id is string => typeof id === 'string') : [];
      const deduped = rawIds.filter((id, index) => rawIds.indexOf(id) === index && defaultIds.includes(id));
      const missing = defaultIds.filter((id) => !deduped.includes(id));
      return [categoryId, [...deduped, ...missing]];
    })
  );
}

function reorderItems(ids: string[], fromId: string, toId: string): string[] {
  if (fromId === toId) {
    return ids;
  }

  const fromIndex = ids.indexOf(fromId);
  const toIndex = ids.indexOf(toId);

  if (fromIndex === -1 || toIndex === -1) {
    return ids;
  }

  const next = [...ids];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

function getInitialAdminEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const queryAdmin = params.get('admin');
  const storedAdmin = window.localStorage.getItem(ADMIN_STORAGE_KEY) === '1';

  if (queryAdmin === '1') {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, '1');
    return true;
  }

  return storedAdmin;
}

function getInitialOrderDraft(defaultOrder: OrderDraft): OrderDraft {
  if (typeof window === 'undefined') {
    return defaultOrder;
  }

  const storedOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
  if (!storedOrder) {
    return defaultOrder;
  }

  try {
    return normalizeOrder(defaultOrder, JSON.parse(storedOrder));
  } catch {
    return defaultOrder;
  }
}

type CategoryMapProps = {
  places: PlaceRef[];
  selectedPlaceId: string;
  onSelectPlace: (placeId: string) => void;
  listItemRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  labelForPlace: (placeId: string) => string;
  locationForPlace: (placeId: string) => string;
};

const CategoryMap: React.FC<CategoryMapProps> = ({
  places,
  selectedPlaceId,
  onSelectPlace,
  listItemRefs,
  labelForPlace,
  locationForPlace
}) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerRef = useRef<Record<string, L.CircleMarker>>({});
  const previousPlacesKeyRef = useRef<string>('');

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([44.97, -93.24], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markerRef.current = {};
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerLayerRef.current) {
      return;
    }

    markerLayerRef.current.clearLayers();
    markerRef.current = {};

    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lng] as [number, number]));

    places.forEach((place) => {
      const isSelected = place.id === selectedPlaceId;
      const marker = L.circleMarker([place.lat, place.lng], {
        radius: isSelected ? 9 : 7,
        color: '#1d4ed8',
        weight: 2,
        fillColor: isSelected ? '#10b981' : '#2563eb',
        fillOpacity: 0.9
      });

      marker.bindTooltip(`<strong>${labelForPlace(place.id)}</strong><br/>${locationForPlace(place.id)}`);
      marker.on('click', () => {
        onSelectPlace(place.id);
        listItemRefs.current[place.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      marker.addTo(markerLayerRef.current!);
      markerRef.current[place.id] = marker;
    });

    const placesKey = places.map((place) => place.id).join('|');
    if (places.length > 0 && previousPlacesKeyRef.current !== placesKey) {
      mapRef.current.fitBounds(bounds.pad(0.18));
      previousPlacesKeyRef.current = placesKey;
    }
  }, [labelForPlace, listItemRefs, locationForPlace, onSelectPlace, places, selectedPlaceId]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    Object.entries(markerRef.current).forEach(([placeId, marker]) => {
      const isSelected = placeId === selectedPlaceId;
      marker.setStyle({
        radius: isSelected ? 9 : 7,
        fillColor: isSelected ? '#10b981' : '#2563eb'
      });
    });

    const selectedPlace = places.find((place) => place.id === selectedPlaceId);
    if (selectedPlace) {
      mapRef.current.flyTo([selectedPlace.lat, selectedPlace.lng], Math.max(mapRef.current.getZoom(), 12), {
        duration: 0.45
      });
    }
  }, [places, selectedPlaceId]);

  return <div ref={mapElementRef} className={styles.mapCanvas} />;
};

const FoodDrink: React.FC = () => {
  const { t } = useTranslation();
  const defaultOrder = useMemo(() => buildDefaultOrder(foodDrinkCategories), []);
  const placeLookup = useMemo(() => buildPlaceLookup(foodDrinkCategories), []);
  const [orderDraft, setOrderDraft] = useState<OrderDraft>(() => getInitialOrderDraft(defaultOrder));
  const [adminEnabled] = useState<boolean>(() => getInitialAdminEnabled());
  const [dragState, setDragState] = useState<{ categoryId: string; placeId: string } | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'done'>('idle');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(foodDrinkCategories[0].id);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(foodDrinkCategories[0].places[0].id);
  const listItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderDraft));
  }, [orderDraft]);

  const hasDraftChanges = JSON.stringify(orderDraft) !== JSON.stringify(defaultOrder);

  const copyOrderJson = async () => {
    const payload = JSON.stringify(orderDraft, null, 2);
    await navigator.clipboard.writeText(payload);
    setCopyState('done');
    window.setTimeout(() => setCopyState('idle'), 1600);
  };

  const resetDraft = () => {
    setOrderDraft(defaultOrder);
    window.localStorage.removeItem(ORDER_STORAGE_KEY);
  };

  const activeCategory = foodDrinkCategories.find((category) => category.id === activeCategoryId) ?? foodDrinkCategories[0];
  const activePlaces = orderDraft[activeCategory.id]
    .map((placeId) => placeLookup[activeCategory.id][placeId])
    .filter(Boolean);
  const selectedPlace =
    activePlaces.find((place) => place.id === selectedPlaceId) ??
    activePlaces[0];

  return (
    <div className="page-wrapper">
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className="animate-fade-in">{t('food_drink.title')}</h1>
          <p className="animate-fade-in delay-100">{t('food_drink.subtitle')}</p>
          {adminEnabled && (
            <div className={styles.adminPanel}>
              <div className={styles.adminBadge}>
                {hasDraftChanges ? t('food_drink.admin.draft_badge') : t('food_drink.admin.published_badge')}
              </div>
              <div className={styles.adminActions}>
                <button type="button" className={styles.adminButton} onClick={copyOrderJson}>
                  <Copy size={16} />
                  <span>{copyState === 'done' ? t('food_drink.admin.copied') : t('food_drink.admin.copy_order')}</span>
                </button>
                <button type="button" className={styles.adminButton} onClick={resetDraft}>
                  <RotateCcw size={16} />
                  <span>{t('food_drink.admin.reset_order')}</span>
                </button>
              </div>
              <p className={styles.adminHint}>{t('food_drink.admin.hint')}</p>
            </div>
          )}
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.viewToggleActive : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
              <span>{t('food_drink.views.list')}</span>
            </button>
            <button
              type="button"
              className={`${styles.viewToggleButton} ${viewMode === 'map' ? styles.viewToggleActive : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Map size={16} />
              <span>{t('food_drink.views.map')}</span>
            </button>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {viewMode === 'list' ? foodDrinkCategories.map((category) => {
            const orderedPlaces = orderDraft[category.id].map((placeId) => placeLookup[category.id][placeId]).filter(Boolean);

            return (
              <div key={category.id} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{t(`food_drink.categories.${category.id}`)}</h2>
                <div className={styles.brandGrid}>
                  {orderedPlaces.map((place) => (
                    <div
                      key={place.id}
                      draggable={adminEnabled}
                      onDragStart={() => setDragState({ categoryId: category.id, placeId: place.id })}
                      onDragOver={(event) => {
                        if (adminEnabled && dragState?.categoryId === category.id) {
                          event.preventDefault();
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        if (!adminEnabled || !dragState || dragState.categoryId !== category.id) {
                          return;
                        }

                        setOrderDraft((current) => ({
                          ...current,
                          [category.id]: reorderItems(current[category.id], dragState.placeId, place.id)
                        }));
                        setDragState(null);
                      }}
                      onDragEnd={() => setDragState(null)}
                      className={adminEnabled ? styles.draggableCard : undefined}
                    >
                      {adminEnabled && (
                        <div className={styles.dragHandle} aria-hidden="true">
                          <GripVertical size={16} />
                          <span>{t('food_drink.admin.drag_label')}</span>
                        </div>
                      )}
                      <BrandCard
                        name={t(`food_drink.places.${place.id}.name`)}
                        meta={t(`food_drink.places.${place.id}.location`)}
                        description={t(`food_drink.places.${place.id}.description`)}
                        linkUrl={place.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery ?? '')}`}
                        linkLabel={t('food_drink.map_link')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          }) : (
            <div className={styles.mapView}>
              <div className={styles.mapSidebar}>
                <div className={styles.mapCategoryTabs}>
                  {foodDrinkCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`${styles.mapCategoryTab} ${activeCategoryId === category.id ? styles.mapCategoryTabActive : ''}`}
                      onClick={() => {
                        setActiveCategoryId(category.id);
                        setSelectedPlaceId(orderDraft[category.id][0]);
                      }}
                    >
                      {t(`food_drink.categories.${category.id}`)}
                    </button>
                  ))}
                </div>
                <div className={styles.mapCardList}>
                  {activePlaces.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      ref={(element) => {
                        listItemRefs.current[place.id] = element;
                      }}
                      className={`${styles.mapCardButton} ${selectedPlace?.id === place.id ? styles.mapCardButtonActive : ''}`}
                      onClick={() => setSelectedPlaceId(place.id)}
                    >
                      <BrandCard
                        name={t(`food_drink.places.${place.id}.name`)}
                        meta={t(`food_drink.places.${place.id}.location`)}
                        description={t(`food_drink.places.${place.id}.description`)}
                        linkUrl={place.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery ?? '')}`}
                        linkLabel={t('food_drink.map_link')}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.mapPanel}>
                {selectedPlace && (
                  <>
                    <div className={styles.mapPanelHeader}>
                      <h2>{t(`food_drink.places.${selectedPlace.id}.name`)}</h2>
                      <p>{t(`food_drink.places.${selectedPlace.id}.location`)}</p>
                    </div>
                    <CategoryMap
                      places={activePlaces}
                      selectedPlaceId={selectedPlace.id}
                      onSelectPlace={setSelectedPlaceId}
                      listItemRefs={listItemRefs}
                      labelForPlace={(placeId) => t(`food_drink.places.${placeId}.name`)}
                      locationForPlace={(placeId) => t(`food_drink.places.${placeId}.location`)}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FoodDrink;
