import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { SubmitButton, TabButton } from '../../components';

export const FeedbackScreen: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [myFeedbacks, setMyFeedbacks] = useState<any[]>([]);
    const [showMyFeedbacks, setShowMyFeedbacks] = useState(false);
    
    const { user, signOut } = useAuth();

    useEffect(() => {
        if (!user?.uid) return;
        const q = query(
            collection(db, 'feedbacks'),
            where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const feedbacks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            console.log('Feedbacks encontrados:', feedbacks.length);

            feedbacks.sort((a: any, b: any) => {
                const dateA = a.createdAt?.toDate?.() || new Date(0);
                const dateB = b.createdAt?.toDate?.() || new Date(0);
                return dateB.getTime() - dateA.getTime();
            });
            
            setMyFeedbacks(feedbacks);
        }, (error) => {
            console.error('Erro ao buscar feedbacks:', error);
            Alert.alert('Erro', 'Não foi possível carregar seus feedbacks');
        });

        return () => unsubscribe();
    }, [user?.uid]);

    const handleRatingPress = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleSubmitFeedback = async () => {
        if (rating === 0) {
            Alert.alert('Erro', 'Por favor, selecione uma avaliação');
            return;
        }

        if (comment.trim().length === 0) {
            Alert.alert('Erro', 'Por favor, adicione um comentário');
            return;
        }

        if (comment.trim().length < 10) {
            Alert.alert('Erro', 'O comentário deve ter pelo menos 10 caracteres para fornecer um feedback útil');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'feedbacks'), {
                userId: user?.uid,
                user: {
                    name: user?.displayName || 'Usuário Anônimo',
                    email: user?.email || '',
                },
                rating,
                comment: comment.trim(),
                status: 'novo',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            Alert.alert(
                'Sucesso', 
                'Feedback enviado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setRating(0);
                            setComment('');
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            Alert.alert('Erro', 'Não foi possível enviar o feedback. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.star,
                        { backgroundColor: i <= rating ? '#FFD700' : '#E0E0E0' }
                    ]}
                    onPress={() => handleRatingPress(i)}
                >
                    <Text style={styles.starText}>★</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    const renderMyFeedbacks = () => {
        if (myFeedbacks.length === 0) {
            return (
                <View style={styles.noFeedbacksContainer}>
                    <Text style={styles.noFeedbacksText}>Você ainda não enviou nenhum feedback</Text>
                </View>
            );
        }

        return myFeedbacks.map((feedback: any) => (
            <View key={feedback.id} style={styles.feedbackCard}>
                <View style={styles.feedbackHeader}>
                    <View style={styles.starsDisplay}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <Text key={star} style={[
                                styles.starDisplayText,
                                { color: star <= (feedback.rating || 0) ? '#FFD700' : '#E0E0E0' }
                            ]}>★</Text>
                        ))}
                    </View>
                    <Text style={styles.feedbackDate}>
                        {feedback.createdAt?.toDate?.()?.toLocaleDateString('pt-BR') || 'Data não disponível'}
                    </Text>
                </View>
                
                <Text style={styles.feedbackComment}>{feedback.comment || 'Sem comentário'}</Text>
                
                <View style={[styles.statusBadge, {
                    backgroundColor: 
                        feedback.status === 'novo' ? '#ffc107' :
                        feedback.status === 'respondido' ? '#28a745' : '#6c757d'
                }]}>
                    <Text style={styles.statusText}>
                        {feedback.status === 'novo' ? 'Aguardando resposta' :
                         feedback.status === 'respondido' ? 'Respondido' : 'Em análise'}
                    </Text>
                </View>

                {feedback.response && (
                    <View style={styles.responseCard}>
                        <Text style={styles.responseLabel}>Resposta da equipe:</Text>
                        <Text style={styles.responseText}>
                            {typeof feedback.response === 'string' 
                                ? feedback.response 
                                : feedback.response.text || 'Resposta não disponível'}
                        </Text>
                        {feedback.responseDate && (
                            <Text style={styles.responseDate}>
                                Respondido em: {feedback.responseDate?.toDate?.()?.toLocaleDateString('pt-BR') || 'Data não disponível'}
                            </Text>
                        )}
                        {feedback.response.respondedAt && !feedback.responseDate && (
                            <Text style={styles.responseDate}>
                                Respondido em: {feedback.response.respondedAt?.toDate?.()?.toLocaleDateString('pt-BR') || 'Data não disponível'}
                            </Text>
                        )}
                    </View>
                )}
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Olá, {user?.displayName || 'Usuário'}!</Text>
                    <Text style={styles.subtitle}>Como foi sua experiência?</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Botões de navegação */}
            <View style={styles.tabContainer}>
                <TabButton
                    title="Novo Feedback"
                    onPress={() => setShowMyFeedbacks(false)}
                    active={!showMyFeedbacks}
                />
                <TabButton
                    title={`Meus Feedbacks (${myFeedbacks.length})`}
                    onPress={() => setShowMyFeedbacks(true)}
                    active={showMyFeedbacks}
                />
            </View>

            {showMyFeedbacks ? (
                <View style={styles.feedbacksContainer}>
                    {renderMyFeedbacks()}
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.title}>Avaliar Atendimento</Text>
                    
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingLabel}>Sua avaliação:</Text>
                        <View style={styles.starsContainer}>
                            {renderStars()}
                        </View>
                        <Text style={styles.ratingText}>
                            {rating === 0 ? 'Toque nas estrelas para avaliar' : 
                             rating === 1 ? 'Muito Ruim' :
                             rating === 2 ? 'Ruim' :
                             rating === 3 ? 'Regular' :
                             rating === 4 ? 'Bom' : 'Excelente'}
                        </Text>
                    </View>

                    <View style={styles.commentSection}>
                        <View style={styles.commentHeader}>
                            <Text style={styles.commentLabel}>Comentário:</Text>
                            <Text style={[
                                styles.characterCount,
                                { color: comment.trim().length < 10 ? '#dc3545' : '#28a745' }
                            ]}>
                                {comment.trim().length}/10 min
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                styles.commentInput,
                                comment.trim().length > 0 && comment.trim().length < 10 && { borderColor: '#dc3545' }
                            ]}
                            placeholder="Conte-nos sobre sua experiência... (mínimo 10 caracteres)"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        {comment.trim().length > 0 && comment.trim().length < 10 && (
                            <Text style={styles.validationText}>
                                Adicione mais {10 - comment.trim().length} caractere(s) para um feedback mais útil
                            </Text>
                        )}
                    </View>

                    <SubmitButton
                        title="Enviar Feedback"
                        onPress={handleSubmitFeedback}
                        disabled={loading}
                        loading={loading}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#862bfdff',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    logoutButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    ratingSection: {
        marginBottom: 30,
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    star: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 2,
    },
    starText: {
        fontSize: 24,
        color: '#fff',
    },
    ratingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
    commentSection: {
        marginBottom: 30,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    commentLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    characterCount: {
        fontSize: 12,
        fontWeight: '500',
    },
    validationText: {
        fontSize: 12,
        color: '#dc3545',
        marginTop: 5,
        fontStyle: 'italic',
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        minHeight: 100,
        backgroundColor: '#f9f9f9',
    },
    // Novos estilos para os tabs
    tabContainer: {
        flexDirection: 'row',
        margin: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    // Estilos para lista de feedbacks
    feedbacksContainer: {
        margin: 20,
        marginTop: 10,
    },
    feedbackCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    starsDisplay: {
        flexDirection: 'row',
    },
    starDisplayText: {
        fontSize: 16,
        marginRight: 2,
    },
    feedbackDate: {
        fontSize: 12,
        color: '#666',
    },
    feedbackComment: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
        lineHeight: 20,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginBottom: 10,
    },
    statusText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
    },
    responseCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#28a745',
    },
    responseLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 5,
    },
    responseText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 18,
        marginBottom: 5,
    },
    responseDate: {
        fontSize: 11,
        color: '#666',
        fontStyle: 'italic',
    },
    noFeedbacksContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    noFeedbacksText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
