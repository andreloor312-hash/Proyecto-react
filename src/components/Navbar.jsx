import { Link } from 'react-router-dom';
import {
  Container,
  Group,
  Title,
  Button,
  Text,
  Box,
  Avatar,
  Menu,
  ThemeIcon,
} from '@mantine/core';
import {
  IconCompass,
  IconLogout,
  IconStar,
  IconMap,
  IconChevronDown,
} from '@tabler/icons-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { user, openAuthModal, logout } = useAuthStore();

  const nombreUsuario = user?.displayName || user?.email?.split('@')[0] || 'Viajero';

  return (
    <Box
      component="header"
      py="sm"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(11, 8, 9, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #3a2d30',
      }}
    >
      <Container size="xl">
        <Group justify="space-between">
          {/* Izquierda: Logo + Navegación */}
          <Group gap="lg">
            <Group gap="xs" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: '#520915', to: '#b81d33' }}>
                <IconCompass size={22} color="#e4c163" />
              </ThemeIcon>
              <Title order={4} c="gold.1" style={{ letterSpacing: '-0.5px' }}>
                Ruta<Text span c="gold.4" inherit>Ecuador</Text>
              </Title>
            </Group>

            <Group gap="xs" visibleFrom="xs">
              <Button component={Link} to="/" variant="subtle" color="gold" size="sm" leftSection={<IconMap size={16} />}>
                Destinos
              </Button>
              <Button component={Link} to="/resenas" variant="subtle" color="gold" size="sm" leftSection={<IconStar size={16} />}>
                Reseñas
              </Button>
            </Group>
          </Group>

          {/* Derecha: Perfil o Botón de Acceso */}
          {user ? (
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <Button variant="subtle" color="gold" px="xs">
                  <Group gap="xs">
                    <Avatar color="wine" radius="xl" size="sm">
                      <Text c="gold.3" fw={700} size="xs">
                        {nombreUsuario[0].toUpperCase()}
                      </Text>
                    </Avatar>
                    <Text size="sm" fw={600} c="gold.2" visibleFrom="xs">
                      {nombreUsuario}
                    </Text>
                    <IconChevronDown size={14} color="#e4c163" />
                  </Group>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label c="gold.4">Cuenta de Viajero</Menu.Label>
                <Menu.Item component={Link} to="/resenas" c="gold.1" leftSection={<IconStar size={14} color="#d4af37" />}>
                  Mis Reseñas
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={logout}>
                  Cerrar Sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              size="sm"
              variant="gradient"
              gradient={{ from: '#720e1e', to: '#b81d33' }}
              c="gold.1"
              onClick={openAuthModal}
            >
              Iniciar Sesión / Registrarse
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  );
}