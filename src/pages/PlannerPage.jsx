import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Button,
  Badge,
  Group,
  Overlay,
  Box,
  Stack,
  Title,
  Divider,
  ActionIcon,
  Modal,
  List,
  ThemeIcon,
  Paper,
  SegmentedControl,
  TextInput,
  NumberInput,
  Alert,
} from '@mantine/core';
import {
  IconLock,
  IconCalculator,
  IconTrash,
  IconCheck,
  IconStar,
  IconEye,
  IconClock,
  IconCircleCheck,
  IconSearch,
  IconSparkles,
  IconCurrencyDollar,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { useAuthStore } from '../store/useAuthStore';
import { useBudgetStore } from '../store/useBudgetStore';

const DESTINOS_ECUADOR = [
  {
    id: 1,
    nombre: 'Baños de Agua Santa',
    region: 'Sierra',
    duracion: '3 días / 2 noches',
    rating: 4.9,
    precioMin: 95,
    precioMax: 160,
    precioBase: 120,
    proveedores: '3 agencias verificadas',
    imagen: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    descripcion:
      'Capital de la aventura en Tungurahua. Ideal para deportes extremos, aguas termales volcánicas y la ruta de las cascadas.',
    incluye: [
      'Hospedaje en hotel céntrico (2 noches)',
      'Tour Ruta de las Cascadas y Pailón del Diablo',
      'Entrada a la Casa del Árbol y miradores',
      'Transporte interno turístico',
    ],
    desglose: { transporte: 35, hospedaje: 50, actividades: 35 },
  },
  {
    id: 2,
    nombre: 'Puerto López / Isla de la Plata',
    region: 'Costa',
    duracion: '3 días / 2 noches',
    rating: 4.8,
    precioMin: 150,
    precioMax: 240,
    precioBase: 185,
    proveedores: '5 operadores locales',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    descripcion:
      'Santuario marino en Manabí dentro del Parque Nacional Machalilla, conocido por el avistamiento de ballenas y piqueros de patas azules.',
    incluye: [
      'Tour en yate a Isla de la Plata + snorkel guiado',
      'Visita a Playa Los Frailes',
      'Hospedaje frente al malecón (2 noches)',
      'Box lunch marino durante la navegación',
    ],
    desglose: { transporte: 55, hospedaje: 60, actividades: 70 },
  },
  {
    id: 3,
    nombre: 'Cuyabeno Lodge',
    region: 'Amazonía',
    duracion: '4 días / 3 noches',
    rating: 4.9,
    precioMin: 260,
    precioMax: 390,
    precioBase: 310,
    proveedores: '2 eco-lodges directos',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    descripcion:
      'Inmersión profunda en la Reserva de Producción de Fauna Cuyabeno en Sucumbíos, navegando en canoa por lagunas inundadas y selva primaria.',
    incluye: [
      'Traslado fluvial en canoa motorizada desde Puente Cuyabeno',
      'Alojamiento en eco-lodge sustentable (3 noches)',
      'Alimentación completa y guía naturalista bilingüe',
      'Caminatas nocturnas y avistamiento de delfines rosados',
    ],
    desglose: { transporte: 80, hospedaje: 140, actividades: 90 },
  },
  {
    id: 4,
    nombre: 'Isla Santa Cruz — Galápagos',
    region: 'Galápagos',
    duracion: '4 días / 3 noches',
    rating: 5.0,
    precioMin: 420,
    precioMax: 650,
    precioBase: 490,
    proveedores: '4 operadores autorizados PNG',
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    descripcion:
      'Explora Tortuga Bay, la Estación Científica Charles Darwin y túneles de lava con tarifas transparentes y guías naturalistas certificados.',
    incluye: [
      'Traslados aeropuerto Baltra – Puerto Ayora',
      'Hospedaje ecológico (3 noches) con desayunos',
      'Tour navegable de bahía + grietas + snorkel',
      'Visita guiada a reserva de tortugas gigantes',
    ],
    desglose: { transporte: 120, hospedaje: 210, actividades: 160 },
  },
];

export default function PlannerPage() {
  const { user, openAuthModal } = useAuthStore();
  const { items, addItem, removeItem } = useBudgetStore();

  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [presupuestoMax, setPresupuestoMax] = useState('');

  const destinosFiltrados = DESTINOS_ECUADOR.filter((d) => {
    const coincideRegion = regionFiltro === 'Todas' || d.region === regionFiltro;
    const coincideTexto = d.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincidePresupuesto =
      presupuestoMax === '' || presupuestoMax === null || Number(presupuestoMax) >= d.precioMin;

    return coincideRegion && coincideTexto && coincidePresupuesto;
  });

  const totalPresupuesto = items.reduce((acc, item) => acc + item.precioBase, 0);
  const excedePresupuesto =
    presupuestoMax !== '' && presupuestoMax !== null && totalPresupuesto > Number(presupuestoMax);

  return (
    <Box bg="#0b0809" mih="100vh" pb="xl">
      {/* Hero Banner en Negro, Rojo Vino y Letras Doradas */}
      <Paper
        radius={0}
        py={48}
        mb="xl"
        style={{
          background: 'linear-gradient(135deg, #0b0809 0%, #520915 50%, #8e1326 100%)',
          borderBottom: '1px solid #523d0c',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            <Box maw={650}>
              <Badge
                color="dark.9"
                c="gold.3"
                variant="filled"
                mb="sm"
                leftSection={<IconSparkles size={12} color="#d4af37" />}
                style={{ border: '1px solid #96741b' }}
              >
                Turismo Exclusivo en Ecuador
              </Badge>
              <Title order={1} mb="xs" c="gold.3" style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>
                Planifica tu ruta sin cotizaciones dispersas
              </Title>
              <Text size="md" c="gold.1">
                Ingresa tu presupuesto disponible, compara rangos de precios reales y consolida tu viaje en un solo lugar.
              </Text>
            </Box>

            <Button
              component={Link}
              to="/resenas"
              size="md"
              variant="outline"
              color="gold"
              leftSection={<IconStar size={18} />}
              style={{ borderColor: '#d4af37', backgroundColor: 'rgba(11, 8, 9, 0.65)' }}
            >
              Experiencias de viajeros
            </Button>
          </Group>
        </Container>
      </Paper>

      <Container size="xl">
        {/* Barra de Filtros */}
        <Paper
          p="md"
          radius="md"
          shadow="md"
          withBorder
          mb="xl"
          bg="#161113"
          style={{ borderColor: '#3a2d30' }}
        >
          <Group justify="space-between" align="flex-end">
            <div>
              <Text size="xs" fw={700} c="gold.4" mb={6}>
                REGIÓN DEL ECUADOR
              </Text>
              <SegmentedControl
                value={regionFiltro}
                onChange={setRegionFiltro}
                data={['Todas', 'Sierra', 'Costa', 'Amazonía', 'Galápagos']}
                color="wine"
              />
            </div>

            <Group gap="sm">
              <NumberInput
                label={<Text size="xs" fw={600} c="gold.3">Tu presupuesto (USD)</Text>}
                placeholder="Ej. 200"
                min={0}
                step={10}
                allowNegative={false}
                leftSection={<IconCurrencyDollar size={16} color="#d4af37" />}
                value={presupuestoMax}
                onChange={setPresupuestoMax}
                w={{ base: '100%', sm: 190 }}
              />

              <TextInput
                label={<Text size="xs" fw={600} c="gold.3">Buscar destino</Text>}
                placeholder="Ej. Baños, Cuyabeno..."
                leftSection={<IconSearch size={16} color="#d4af37" />}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                w={{ base: '100%', sm: 230 }}
              />
            </Group>
          </Group>
        </Paper>

        <Grid gutter="xl">
          {/* Columna Izquierda: Tarjetas de Destinos */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {destinosFiltrados.length === 0 ? (
              <Paper
                p="xl"
                radius="md"
                withBorder
                ta="center"
                bg="#161113"
                style={{ borderColor: '#3a2d30' }}
              >
                <Text fw={700} size="lg" mb="xs" c="gold.3">
                  No hay destinos dentro de ese presupuesto o filtro
                </Text>
                <Text size="sm" c="gold.1" mb="md">
                  Intenta aumentar tu monto en USD o limpia los filtros para ver todas las rutas disponibles.
                </Text>
                <Button
                  variant="light"
                  color="gold"
                  onClick={() => {
                    setPresupuestoMax('');
                    setRegionFiltro('Todas');
                    setBusqueda('');
                  }}
                >
                  Restablecer filtros
                </Button>
              </Paper>
            ) : (
              <Grid>
                {destinosFiltrados.map((destino) => {
                  const yaAgregado = items.some((item) => item.id === destino.id);

                  return (
                    <Grid.Col key={destino.id} span={{ base: 12, sm: 6 }}>
                      <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        h="100%"
                        bg="#161113"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderColor: '#3a2d30',
                        }}
                      >
                        <Card.Section>
                          <Box pos="relative">
                            <Image src={destino.imagen} height={175} alt={destino.nombre} />
                            <Badge
                              color="wine.8"
                              c="gold.2"
                              variant="filled"
                              style={{ position: 'absolute', top: 12, left: 12, opacity: 0.95 }}
                            >
                              {destino.region}
                            </Badge>
                            <Badge
                              color="dark.9"
                              c="gold.3"
                              variant="filled"
                              leftSection={<IconStar size={12} color="#d4af37" />}
                              style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                border: '1px solid #96741b',
                              }}
                            >
                              {destino.rating}
                            </Badge>
                          </Box>
                        </Card.Section>

                        <Stack justify="space-between" mt="md" style={{ flex: 1 }}>
                          <div>
                            <Text fw={700} size="lg" mb={4} c="gold.3">
                              {destino.nombre}
                            </Text>
                            <Group gap="xs" c="gold.2" mb="xs">
                              <IconClock size={14} color="#d4af37" />
                              <Text size="xs">{destino.duracion}</Text>
                              <Badge size="xs" variant="outline" color="gold">
                                ${destino.precioMin} - ${destino.precioMax}
                              </Badge>
                            </Group>
                            <Text size="sm" c="gold.1" lineClamp={2}>
                              {destino.descripcion}
                            </Text>
                          </div>

                          <div>
                            <Divider my="sm" color="#3a2d30" />
                            {user ? (
                              <Stack gap="xs">
                                <Group justify="space-between">
                                  <div>
                                    <Text size="xs" c="gold.2">
                                      Rango: ${destino.precioMin} – ${destino.precioMax} USD
                                    </Text>
                                    <Text fw={700} size="lg" c="gold.4">
                                      Base: ${destino.precioBase}{' '}
                                      <Text span size="xs" c="gold.2" fw={400}>
                                        USD
                                      </Text>
                                    </Text>
                                  </div>
                                  <Text size="xs" c="gold.3" fw={500}>
                                    {destino.proveedores}
                                  </Text>
                                </Group>

                                <Group grow gap="xs">
                                  <Button
                                    variant="default"
                                    c="gold.2"
                                    size="xs"
                                    leftSection={<IconEye size={15} color="#d4af37" />}
                                    onClick={() => setDestinoSeleccionado(destino)}
                                  >
                                    Detalle
                                  </Button>
                                  <Button
                                    size="xs"
                                    color={yaAgregado ? 'dark.4' : 'wine'}
                                    c="gold.1"
                                    leftSection={yaAgregado ? <IconCheck size={15} /> : null}
                                    disabled={yaAgregado}
                                    onClick={() => addItem(user.uid, destino)}
                                  >
                                    {yaAgregado ? 'Agregado' : 'Agregar'}
                                  </Button>
                                </Group>
                              </Stack>
                            ) : (
                              <Group grow gap="xs">
                                <Button
                                  variant="default"
                                  c="gold.2"
                                  size="xs"
                                  leftSection={<IconEye size={15} color="#d4af37" />}
                                  onClick={() => setDestinoSeleccionado(destino)}
                                >
                                  Ver detalle
                                </Button>
                                <Button
                                  variant="light"
                                  color="wine"
                                  c="gold.3"
                                  size="xs"
                                  leftSection={<IconLock size={14} color="#d4af37" />}
                                  onClick={openAuthModal}
                                >
                                  Desbloquear
                                </Button>
                              </Group>
                            )}
                          </div>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  );
                })}
              </Grid>
            )}
          </Grid.Col>

          {/* Columna Derecha: Calculadora Sticky */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box pos="sticky" top={80}>
              <Box pos="relative">
                <Card
                  shadow="lg"
                  padding="lg"
                  radius="md"
                  withBorder
                  mih={350}
                  bg="#161113"
                  style={{ borderColor: '#735713' }}
                >
                  <Group justify="space-between" mb="md">
                    <Group gap="xs">
                      <ThemeIcon variant="light" color="wine" size="md">
                        <IconCalculator size={18} color="#d4af37" />
                      </ThemeIcon>
                      <Text fw={700} size="md" c="gold.3">
                        Mi Presupuesto
                      </Text>
                    </Group>
                    {items.length > 0 && (
                      <Badge color="wine" c="gold.2" variant="filled">
                        {items.length} {items.length === 1 ? 'destino' : 'destinos'}
                      </Badge>
                    )}
                  </Group>

                  {items.length === 0 ? (
                    <Stack align="center" justify="center" py="xl" ta="center">
                      <Text size="sm" c="gold.1">
                        Tu itinerario está vacío. Selecciona destinos de la izquierda para calcular automáticamente tu viaje.
                      </Text>
                    </Stack>
                  ) : (
                    <Stack gap="sm">
                      {items.map((item) => (
                        <Paper
                          key={item.id}
                          p="xs"
                          withBorder
                          radius="sm"
                          bg="#1f1619"
                          style={{ borderColor: '#3a2d30' }}
                        >
                          <Group justify="space-between" wrap="nowrap">
                            <div>
                              <Text size="sm" fw={600} c="gold.2">
                                {item.nombre}
                              </Text>
                              <Text size="xs" c="gold.4" fw={700}>
                                ${item.precioBase} USD
                              </Text>
                            </div>
                            <ActionIcon
                              color="gold"
                              variant="subtle"
                              onClick={() => removeItem(user.uid, item.id)}
                              title="Quitar destino"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      ))}

                      <Divider my="xs" color="#3a2d30" />

                      <Group justify="space-between" align="baseline">
                        <Text fw={600} size="sm" c="gold.2">
                          TOTAL ESTIMADO
                        </Text>
                        <Text fw={800} size="xl" c={excedePresupuesto ? 'red.4' : 'gold.4'}>
                          ${totalPresupuesto} USD
                        </Text>
                      </Group>

                      {excedePresupuesto && (
                        <Alert
                          icon={<IconAlertTriangle size={16} />}
                          color="red"
                          variant="light"
                          p="xs"
                        >
                          Superaste tu presupuesto ingresado (${presupuestoMax} USD) por $
                          {totalPresupuesto - Number(presupuestoMax)} USD.
                        </Alert>
                      )}

                      <Button
                        fullWidth
                        size="md"
                        mt="sm"
                        variant="gradient"
                        gradient={{ from: '#720e1e', to: '#b81d33' }}
                        c="gold.2"
                      >
                        Solicitar reserva consolidada
                      </Button>
                    </Stack>
                  )}
                </Card>

                {/* Overlay de Bloqueo para Invitados */}
                {!user && (
                  <Overlay color="#050304" backgroundOpacity={0.84} blur={5} radius="md" center>
                    <Stack align="center" p="lg" ta="center">
                      <ThemeIcon size={50} radius="xl" color="wine" variant="filled">
                        <IconLock size={26} color="#e4c163" />
                      </ThemeIcon>
                      <Text c="gold.3" fw={700} size="md">
                        Presupuesto Inteligente Bloqueado
                      </Text>
                      <Text c="gold.1" size="xs">
                        Inicia sesión o regístrate gratis para desbloquear tarifas reales y guardar tu itinerario en la nube.
                      </Text>
                      <Button
                        mt="xs"
                        variant="gradient"
                        gradient={{ from: '#720e1e', to: '#b81d33' }}
                        c="gold.2"
                        onClick={openAuthModal}
                      >
                        Desbloquear ahora
                      </Button>
                    </Stack>
                  </Overlay>
                )}
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Modal de Detalle del Destino */}
      <Modal
        opened={Boolean(destinoSeleccionado)}
        onClose={() => setDestinoSeleccionado(null)}
        title={
          <Group gap="xs">
            <Text fw={700} size="lg" c="gold.3">
              {destinoSeleccionado?.nombre}
            </Text>
            <Badge color="wine" c="gold.2" variant="filled">
              {destinoSeleccionado?.region}
            </Badge>
          </Group>
        }
        size="lg"
        centered
      >
        {destinoSeleccionado && (
          <Stack>
            <Image src={destinoSeleccionado.imagen} height={200} radius="md" alt={destinoSeleccionado.nombre} />

            <Group justify="space-between">
              <Group gap="xs" c="gold.2">
                <IconClock size={16} color="#d4af37" />
                <Text size="sm">
                  Duración: <b>{destinoSeleccionado.duracion}</b>
                </Text>
              </Group>
              <Badge color="dark" c="gold.3" variant="outline" leftSection={<IconStar size={12} color="#d4af37" />}>
                Calificación {destinoSeleccionado.rating} / 5.0
              </Badge>
            </Group>

            <Text size="sm" c="gold.1">
              {destinoSeleccionado.descripcion}
            </Text>

            <Divider
              label={<Text size="xs" c="gold.4">¿Qué incluye el paquete base?</Text>}
              labelPosition="left"
              color="#3a2d30"
            />

            <List
              spacing="xs"
              size="sm"
              c="gold.1"
              icon={
                <ThemeIcon color="wine" size={20} radius="xl">
                  <IconCircleCheck size={14} color="#ecbd3d" />
                </ThemeIcon>
              }
            >
              {destinoSeleccionado.incluye.map((punto, idx) => (
                <List.Item key={idx}>{punto}</List.Item>
              ))}
            </List>

            <Divider
              label={<Text size="xs" c="gold.4">Desglose financiero transparente</Text>}
              labelPosition="left"
              color="#3a2d30"
            />

            {user ? (
              <Card withBorder bg="#1f1619" radius="md" style={{ borderColor: '#735713' }}>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="gold.1">Rango estimado según temporada:</Text>
                    <Badge color="gold" variant="outline">
                      ${destinoSeleccionado.precioMin} – ${destinoSeleccionado.precioMax} USD
                    </Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="gold.1">Transporte y traslados:</Text>
                    <Text size="sm" fw={600} c="gold.2">
                      ${destinoSeleccionado.desglose.transporte} USD
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="gold.1">Hospedaje verificado:</Text>
                    <Text size="sm" fw={600} c="gold.2">
                      ${destinoSeleccionado.desglose.hospedaje} USD
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="gold.1">Tours y entradas:</Text>
                    <Text size="sm" fw={600} c="gold.2">
                      ${destinoSeleccionado.desglose.actividades} USD
                    </Text>
                  </Group>
                  <Divider color="#3a2d30" />
                  <Group justify="space-between">
                    <Text fw={700} c="gold.2">Tarifa base por persona:</Text>
                    <Text fw={700} size="lg" c="gold.4">
                      ${destinoSeleccionado.precioBase} USD
                    </Text>
                  </Group>

                  <Button
                    fullWidth
                    mt="sm"
                    variant="gradient"
                    gradient={{ from: '#720e1e', to: '#b81d33' }}
                    c="gold.2"
                    disabled={items.some((item) => item.id === destinoSeleccionado.id)}
                    onClick={() => {
                      addItem(user.uid, destinoSeleccionado);
                      setDestinoSeleccionado(null);
                    }}
                  >
                    {items.some((item) => item.id === destinoSeleccionado.id)
                      ? 'Ya está en tu presupuesto'
                      : 'Agregar este destino a mi presupuesto'}
                  </Button>
                </Stack>
              </Card>
            ) : (
              <Card withBorder bg="#1f1619" radius="md" ta="center" style={{ borderColor: '#735713' }}>
                <Stack align="center" gap="xs">
                  <IconLock size={24} color="#e4b92c" />
                  <Text size="sm" fw={600} c="gold.3">
                    Desglose de precios oculto
                  </Text>
                  <Text size="xs" c="gold.1">
                    Inicia sesión para ver cuánto cuesta el transporte, hospedaje y tours por separado.
                  </Text>
                  <Button
                    size="xs"
                    color="wine"
                    c="gold.2"
                    mt="xs"
                    onClick={() => {
                      setDestinoSeleccionado(null);
                      openAuthModal();
                    }}
                  >
                    Iniciar sesión para desbloquear
                  </Button>
                </Stack>
              </Card>
            )}
          </Stack>
        )}
      </Modal>
    </Box>
  );
}