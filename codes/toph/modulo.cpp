#include<iostream>
#include<queue>
#include<utility>
using namespace std;


#define ll long long
#define pii pair<ll,int>
#define x first
#define y second

int32_t main()
{
	ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0);

	int t, tc = 1; cin >> t; while (t--) {
		cout << "Case " << tc++ << ":\n";
		int n; cin >> n;
		priority_queue<pii> p;
		for (int i = 0; i < n; i++) {
			ll a; cin >> a; p.push({a, i});
		} int q; cin >> q; while (q--) {
			ll a; cin >> a; while (1) {
				auto x = p.top();
				if (x.x < a)break;
				x.x %= a; p.pop(); p.push(x);
			}
		} ll r[n]; while (!p.empty()) {
			auto x = p.top(); p.pop();
			r[x.y] = x.x;
		} for (int i = 0; i < n; i++)cout << r[i] << " \n"[i == n - 1];
	}
	return 0;
}