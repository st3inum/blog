#include <bits/stdc++.h>
using namespace std;


const int maxn = 200000 + 5;
struct query {
	int l, r, id;
} q[maxn];

const int block_sz = 320;

bool cmp(query &a, query &b) {
	int block_a = a.l / block_sz, block_b = b.l / block_sz;
	if (block_a == block_b) return a.r < b.r;
	return block_a < block_b;
}

int l = 1, r = 0, a[maxn], cnt[1000010];
long long ans[maxn], an = 0;

void add(int x) { an += 1LL * a[x] * (2*(cnt[a[x]]++) + 1); }
void remove(int x) { an += 1LL * a[x] * (-2*(cnt[a[x]]--) + 1); }

int main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int n, Q; cin >> n >> Q;
	for (int i = 1; i <= n; i++)cin >> a[i];
	for (int i = 0; i < Q; i++) {
		cin >> q[i].l >> q[i].r;
		q[i].id = i;
	}
	sort(q, q + Q, cmp);
	for (int i = 0; i < Q; i++) {
		while (l > q[i].l) add(--l);
		while (r < q[i].r) add(++r);
		while (l < q[i].l) remove(l++);
		while (r > q[i].r) remove(r--);
		ans[q[i].id] = an;
	}
	for (int i = 0; i < Q; i++)cout << ans[i] << '\n';
}