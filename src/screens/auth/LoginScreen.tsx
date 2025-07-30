import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { PrimaryButton, SecondaryButton } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';



export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Estados para criar usuário
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPhone, setNewUserPhone] = useState('');

    const { signIn } = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            Alert.alert('Erro', 'Email ou senha incorretos');
        } finally {
            setLoading(false);
        }
    };

    // Função para criar usuário com dados personalizados
    const createTestUser = () => {
        setShowCreateForm(true);
    };

    const createUserWithData = async () => {
        if (!newUserName.trim() || !newUserEmail.trim() || !newUserPhone.trim()) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }

        try {
            setLoading(true);
            const defaultPassword = '123456';
            const { user } = await createUserWithEmailAndPassword(auth, newUserEmail, defaultPassword);

            await setDoc(doc(db, 'users', user.uid), {
                email: newUserEmail,
                name: newUserName,
                phone: newUserPhone,
                role: 'user',
                createdAt: new Date()
            });

            setNewUserName('');
            setNewUserEmail('');
            setNewUserPhone('');
            setShowCreateForm(false);

            Alert.alert(
                'Sucesso',
                `Usuário criado!\nNome: ${newUserName}\nEmail: ${newUserEmail}\nTelefone: ${newUserPhone}\nSenha: ${defaultPassword}`
            );
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="heart-circle" size={150} color="#fff" />
                <Text style={styles.headerText}>Leve Saúde</Text>
                <Text style={styles.titleHeader}>Feedback</Text>
                <Text style={styles.subtitle}>Sua opinião é importante para nós! 💙</Text>
                <Text style={styles.subtitle}>Compartilhe sua experiência e nos ajude a melhorar</Text>
            </View>
            <View style={styles.card}>
                {showCreateForm ? (
                    <>
                        <Text style={styles.title}>Criar Novo Usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome completo"
                            value={newUserName}
                            onChangeText={setNewUserName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={newUserEmail}
                            onChangeText={setNewUserEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            value={newUserPhone}
                            onChangeText={setNewUserPhone}
                            keyboardType="phone-pad"
                        />
                        <PrimaryButton
                            title="Criar Usuário"
                            onPress={createUserWithData}
                            disabled={loading}
                            loading={loading}
                        />
                        <SecondaryButton
                            title="Cancelar"
                            onPress={() => setShowCreateForm(false)}
                            disabled={loading}
                            backgroundColor="#6c757d"
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <PrimaryButton
                            title="Entrar"
                            onPress={handleLogin}
                            disabled={loading}
                            loading={loading}
                        />

                        <SecondaryButton
                            title="Criar Novo Usuário"
                            onPress={createTestUser}
                            disabled={loading}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#862bfdff',
    },
    header: {
        flex: 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#862bfdff',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#fabf7bff',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    card: {
        flex: 0.55,
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
});